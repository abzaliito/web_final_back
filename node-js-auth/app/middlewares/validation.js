const Joi = require("joi");

const validateSignup = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        roles: Joi.array().items(Joi.string())
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
};

const validateOrder = (req, res, next) => {
    const schema = Joi.object({
        products: Joi.array().items(
            Joi.object({
                productId: Joi.number().required(),
                title: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().integer().min(1).required(),
                image: Joi.string().uri().allow("")
            })
        ).min(1).required(),
        totalAmount: Joi.number().required(),
        status: Joi.string()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateSignup,
    validateOrder
};
