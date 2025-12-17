const statusCodes = require("http-status-codes")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/foodmodels")

module.exports.addFood = async (req, res) => {
    try {
        const {food_name,  food_description} = req.body;

        const findFood = await userModel.findOne({food_name})
        if(findFood){
            res.json({
                status:statusCodes.BAD_REQUEST,
                success: false,
                message:"food name already exit "
            });

             }
             else{
                const fileName = req.body.fileName;
                const foodData = {
                    food_name:food_name,
                    food_description:food_description,
                    food_image:fileName
                }

                const addFood = await userModel.create(foodData)
                await addFood.save();
                if(addFood){
                    res.json({
                        status:statusCodes.OK,
                        success:true,
                        message:"add food successfully"
                    });
                } }
    } catch (error) {
        
    }
}

module.exports.getAllFoods = async (req, res) => {
    try {
        const foods = await userModel.find();

        if (!foods || foods.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: "No foods found",
            });
        }

        res.status(statusCodes.OK).json({
            success: true,
            message: "foods fetched successfully",
            data: foods
        });
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};