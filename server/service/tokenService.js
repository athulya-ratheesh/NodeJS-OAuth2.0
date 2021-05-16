let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
    userDB = injectedUserDB;
    tokenDB = injectedTokenDB;
    console.log("................1..............")
    return {
        getClient: getClient,
        saveAccessToken: saveAccessToken,
        getUser: getUser,
        grantTypeAllowed: grantTypeAllowed,
        getAccessToken: getAccessToken,
    };
};

function getClient(clientID, clientSecret, cbFunc) {
    console.log("................1.1.............")
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null,
    };

    cbFunc(false, client);
}

function grantTypeAllowed(clientID, grantType, cbFunc) {
    console.log("................2..............")
    cbFunc(false, true);
}

function getUser(username, password, cbFunc) {
    console.log("................3..............")
    userDB.getUser(username, password, cbFunc);
}

function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {
    console.log("................4..............")
    tokenDB.saveAccessToken(accessToken, user.id, cbFunc);
}

function getAccessToken(bearerToken, cbFunc) {
    console.log("................5..............", bearerToken)
    tokenDB.getUserIDFromBearerToken(bearerToken, (userID) => {
        console.log("userID...", userID)
        const accessToken = {
            user: {
                id: userID,
            },
            expires: null,
        };
        if (!userID) {
            userID = null
        }
        cbFunc(userID === null, userID === null ? null : accessToken);
    });
}
