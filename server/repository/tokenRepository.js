let dbConnection;
const getDBConnection = require('../config/dbConfig')

module.exports = (injectedPgPool) => {
    dbConnection = injectedPgPool;

    return {
        saveAccessToken: saveAccessToken,
        getUserIDFromBearerToken: getUserIDFromBearerToken,
    };
};

async function saveAccessToken(accessToken, userID, cbFunc) {
    const getUserQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${accessToken}', ${userID});`;

    const db = getDBConnection.connectDB();

    await db.query(getUserQuery, (response) => {
        cbFunc(response)
    });
}

async function getUserIDFromBearerToken(bearerToken, cbFunc) {
    const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;
    const db = getDBConnection.connectDB();

    const result = await db.query(getUserIDQuery);

    cbFunc(
        result && result.length > 0
            ? result[0]
            : null
    );
}