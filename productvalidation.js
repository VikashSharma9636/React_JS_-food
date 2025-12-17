// const { celebrate, Joi } = require('celebrate');

// module.exports.productValidations = celebrate({
//   body: Joi.object().keys({
//     product_name: Joi.string().required(),
//     product_price: Joi.number().required(),     // 👈 price ko number rakho
//     product_image: Joi.string().optional(),     // 👈 optional rakha
//     product_description: Joi.string().required()
//   })
// });

const { celebrate, Joi, Segments } = require("celebrate");

module.exports.productValidations = celebrate({
  [Segments.BODY]: Joi.object().keys({
    product_name: Joi.string().required().messages({
      "string.base": "Product name must be a string",
      "any.required": "Product name is required"
    }),
    product_price: Joi.number().required().messages({
      "number.base": "Product price must be a number",
      "any.required": "Product price is required"
    }),
    product_description: Joi.string().required().messages({
      "string.base": "Product description must be a string",
      "any.required": "Product description is required"
    }),
    // agar tum URL/string save कर रहे हो
    // product_image: Joi.string().optional(),

    // agar tum multer (file upload) use कर रहे हो
    product_image: Joi.any().optional()
  })
});

