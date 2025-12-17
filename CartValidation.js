const { Joi, celebrate } = require("celebrate");

exports.addToCartValidation = celebrate({
  body: Joi.object({
    product_id: Joi.string().required(),
    category_id: Joi.string().required(),
    product_name: Joi.string().required(),
    product_price: Joi.number().required(),

    // quantity सिर्फ तब चाहिए जब नया insert हो,
    // increment/decrement action पर इसकी जरूरत नहीं
    product_quantity: Joi.when("action", {
      is: Joi.exist(),
      then: Joi.number().min(1).optional(),   // increment/decrement → optional
      otherwise: Joi.number().min(1).required(), // insert → required
    }),

    product_image: Joi.string().allow("", null),

    // ✅ extra info optional रखा
    category_name: Joi.string().optional(),
    category_description: Joi.string().allow("", null),
    category_image: Joi.string().allow("", null),

    // increment/decrement
    action: Joi.string().valid("increment", "decrement").optional(),
  }),
});
