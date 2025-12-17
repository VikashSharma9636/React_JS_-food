const statusCodes =require("http-status-codes")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const userModel=require("../models/usermodels")
module.exports.signupUser =async (req , res)=>{
    try {
        const {name, email, password}  = req.body;
       
        const findUser=await userModel.findOne({email})
        if(findUser) {
            res.json({
                status: statusCodes.BAD_REQUEST,
                success: false,
                message:"email already exit"
});
        }else {
            const saltRounds =10;
            const hashPassword =await bcrypt.hash(password,saltRounds);
            const fileName = req.body.filename;
            console.log('56565',req);
            
            const userData ={
                name:name,
                email:email,
                password:hashPassword,
                
            }
            console.log('khush',userData);
            
            const addUser =await userModel.create(userData)
            await addUser.save();
            if (addUser){
                res.json({
                    ststus:statusCodes.OK,
                    success:true,
                    message:"user signup successfully",
                    data:addUser
                });
            } }
    } catch (error) {
    }}




//Login

module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const findUser = await userModel.findOne({email})
        if(!findUser) {
            res.json({
                status: statusCodes.BAD_REQUEST,
                success: false,
                message: "email not exist"
            });
        }

        const isValidPassword = await bcrypt.compare(password, findUser.password)
        if(!isValidPassword) {
            res.json({
                status: statusCodes.BAD_REQUEST,
                success: false,
                message: "invalid password"
            });
        }

        const SECRET_KEY = 'Akshay';
        const token = jwt.sign({userId: findUser._id, userEmail: findUser.email},SECRET_KEY, {expiresIn: "12h"})
        res.json({
            status: statusCodes.OK,
            success: true,
            message: "user login successfully",
            data: findUser,
            token: token
        })
    } catch (err) {
        res.json({
            status: statusCodes.BAD_REQUEST,
            success: false,
            message: err.message
        });
    }
}