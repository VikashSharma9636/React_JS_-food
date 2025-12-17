// validation/CategoriesValidation.js
const { celebrate, Joi, Segments } = require("celebrate");

module.exports.categoriesValidations = celebrate({
  [Segments.BODY]: Joi.object().keys({
    Category_name: Joi.string().required(),  // ✅ add product_id
   SKU_Category: Joi.string().required(),
    
    // ❌ remove categories_image because multer handles it
  }),
});
