const Joi = require('joi');

module.exports = (router, app, authenticator) => {
    router.post("/register", createUser, authenticator.registerUser);
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

const validateFnGenerator = (schema) =>
    async (req, res, next) => {
        try {
            const result = schema.validate(req.body);
            if (result.error) {
                throw res.status(400).send(result.error.message);
            }
            next();
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

const createUserSchema = Joi.object({
    username: Joi.string().trim().min(5).required(),
    password: Joi.string().trim().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    grant_type: Joi.string().trim().required(),
    client_id: Joi.string().trim().required(),
    client_secret: Joi.string().trim().required()
});

const createUser = validateFnGenerator(createUserSchema);