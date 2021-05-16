module.exports = (router, app, authenticator) => {
    router.post("/register", authenticator.registerUser);
    router.post("/login", allowJson,
        app.oauth.grant(),
        authenticator.login);
    return router;
};

var allowJson = function (req, res, next) {
    if (req.is('json'))
        req.headers['content-type'] = 'application/x-www-form-urlencoded';

    next();
};