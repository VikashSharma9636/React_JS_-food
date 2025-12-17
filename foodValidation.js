const {celebrate, Joi} = require('celebrate');

module.exports.FoodValidations = celebrate({
    body:Joi.object().keys({
        food_name:Joi.string().required(),
        food_description:Joi.string().required(),
        food_image:Joi.string().required().optional()

    })
})