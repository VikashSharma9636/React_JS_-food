const express =require('express')
const userValidation=require('../validation/uservalidation')
const userController=require('../controller/usercontroller')

const router = express.Router();
router.post("/signup",userValidation.signupValidations,userController.signupUser);
router.post("/loginUser",userValidation.loginValidations,userController.loginUser);








module.exports = router;