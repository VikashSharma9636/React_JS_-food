const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name:{type:String,text:true},
    email:{type:String,text:true},
    password:{type:String,text:true},
    status:{type:Boolean,default:true},
},{timestamps:true})
module.exports = mongoose.model("Users",userSchema)