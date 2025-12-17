const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    food_name:{type:String,text:true},
    food_description:{type:String,text:true},
    status:{type:Boolean,default:true},
    food_image:{type:String,text:true}
},{timestamps:true})
module.exports = mongoose.model("add_food",userSchema)