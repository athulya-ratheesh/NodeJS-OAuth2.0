let dbConnection;
const getDBConnection = require('../config/dbConfig')

module.exports = (injectedPgPool) => {
    dbConnection = injectedPgPool;

    return {
        register: register,
        getUser: getUser,
        isValidUser: isValidUser,
    };
};

var crypto = require("crypto");

async function register(username, password, cbFunc) {
    console.log("..username....", username)
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");
    const query = `INSERT INTO users (username, user_password) VALUES ('${username}', '${shaPass}')`;

    const db = getDBConnection.connectDB();
    // db.query(getUserQuery, (response) => {
    // 	cbFunc(response.error);
    // });
    const result = await db.query(query);
    console.log("result..", result)
    cbFunc(result);
}

async function getUser(username, password, cbFunc) {
    var shaPass = crypto.createHash("sha256").update(password).digest("hex");

    const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;
    const db = getDBConnection.connectDB();
    const result = await db.query(getUserQuery);
    cbFunc(
        false,
        result && result.length > 0
            ? result[0]
            : null
    );

}

async function isValidUser(username, cbFunc) {
    console.log("username...", username)
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    const checkUsrcbFunc = (response) => {
        console.log("response..", response)
        const isValidUser = response
            && response.length > 0 ? true
            : false;
        console.log("isval", isValidUser)
        cbFunc(response.error, isValidUser);
    };
    const db = getDBConnection.connectDB();

    const result = await db.query(query);
    checkUsrcbFunc(result);
}
