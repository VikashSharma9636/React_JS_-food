const {celebrate, Joi} = require('celebrate');

module.exports.signupValidations = celebrate({
    body:Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),

    })
})

module.exports.loginValidations = celebrate({
    body:Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
})