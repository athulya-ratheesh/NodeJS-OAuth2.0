require('dotenv').config();
const PORT = process.env.PORT;

// Database imports
const dbConfig = require("./server/config/dbConfig");
const tokenRepository = require("./server/repository/tokenRepository")(dbConfig);
const userRepository = require("./server/repository/userRepository")(dbConfig);

// OAuth imports
const oAuthService = require("./server/service/tokenService")(userRepository, tokenRepository);
const oAuth2Server = require("node-oauth2-server");

// Express
const express = require("express");
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.oauth = oAuth2Server({
    model: oAuthService,
    grants: ["password"],
    client_id: "client",
    client_secret: "secret",
    debug: true,
});

const testService = require("./server/service/testService.js");
const testAPIRoutes = require("./server/routes/testRoute.js")(
    express.Router(),
    app,
    testService
);

// Auth and routes
const authenticator = require("./server/service/authService")(userRepository);
const routes = require("./server/routes/authRoute")(
    express.Router(),
    app,
    authenticator
);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(app.oauth.errorHandler());
app.use("/auth", routes);
app.use("/test", testAPIRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
