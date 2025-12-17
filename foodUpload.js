const multer = require("multer");
const path = require("path");
const imageStorage = multer.diskStorage({
    destination : "uploads",
    filename : (req,file,cb) =>{
        console.log("req1",req);
        
        cb(null,file.fieldname +'_'+ Date.now()
    +path.extname(file.originalname))
    }
    
});
module.exports.fileUpload = multer({
    storage:imageStorage
})
