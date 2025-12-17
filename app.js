const connectDB=require("../Backend/config/db")
const express=require("express")
var cors = require('cors')
const path = require('path');

require("dotenv").config()
const app=express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use(require('../../food/backend/routes/userroutes'))
app.use(require('../Backend/routes/productroutes'))
app.use(require('../Backend/routes/foodroutes'))
app.use(require('../Backend/routes/Categoriesroutes'))
app.use(require('../Backend/routes/Cartroutes'))

// connectDB and server listen
// app.listen(5000, '0.0.0.0', () => console.log('server running'));
const PORT=5000;
connectDB().then(()=>{
    app.listen(PORT,'0.0.0.0',()=>{
        console.log("server start successfully");
        console.log("server running on port",PORT);
        
    })
})


