const mongoose=require("mongoose")

async function connectDB(){
    try{
await mongoose.connect(process.env.MONGODB_URL)
console.log("connect to mongodb");

}catch(err){
    console.log("error",err);
    console.log(err.message);
    
}
}
module.exports =connectDB