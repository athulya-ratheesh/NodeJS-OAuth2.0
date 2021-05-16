let userDB;

module.exports = (injectedUserDB) => {
    userDB = injectedUserDB;

    return {
        registerUser: registerUser,
        login: login,
    };
};

function registerUser(req, res) {
    console.log("req body.....", req.body, req.query.username)
    userDB.isValidUser(req.body.username, (error, isValidUser) => {
        console.log("isValidUser...", isValidUser)
        if (error || isValidUser) {
            const message = error
                ? "Something went wrong!"
                : "This user already exists!";

            sendResponse(res, message, error);

            return;
        }

        userDB.register(req.body.username, req.body.password, (response) => {
            console.log("res register...", response)
            sendResponse(
                res,
                response.error === undefined ? "Success!!" : "Something went wrong!",
                response.error
            );
        });
    });
}

function login(query, res) {
    console.log("gggggggggg")
}

function sendResponse(res, message, error) {
    res.status(error !== undefined ? 400 : 200).json({
        message: message,
        error: error,
    });
}
