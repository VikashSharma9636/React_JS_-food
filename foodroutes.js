const express = require("express")
const foodValidation = require('../validation/foodValidation')
const foddcontroller = require('../controller/foodcontroller')
const imageUpload = require('../middleware/foodUpload')

const router = express.Router();

router.post("/add_Food",imageUpload.fileUpload.single("food_image"),foodValidation.FoodValidations,foddcontroller.addFood);

router.post("/Food",foddcontroller.getAllFoods);


module.exports=router;