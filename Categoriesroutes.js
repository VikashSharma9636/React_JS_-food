const express = require("express")
const CategoriesValidation = require('../validation/CategoriesValidation')
const Categoriescontroller = require('../controller/Categoriescontroller')
const imageUpload = require('../middleware/CategoriesUpload')

const router = express.Router();

// add category
router.post("/add_Categories",CategoriesValidation.categoriesValidations,Categoriescontroller.AddCategories);

// router.post("/Categories",Categoriescontroller.getAllCategories);
router.post("/Edit_Categories/:id", Categoriescontroller.editCategory);

// delete category
router.delete("/Delete_Categories/:id", Categoriescontroller.deleteCategory);

// view category
router.post("/categories/:id", Categoriescontroller.getCategoriesByProductId);





module.exports=router;