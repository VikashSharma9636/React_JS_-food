const express = require("express");
const router = express.Router();
const cartController = require("../controller/Cartcontroller");
const  addToCartValidation  = require("../validation/CartValidation");
const { fileUpload } = require("../middleware/productupload"); // tumne export fileUpload kiya hai


// Add to cart route with validation
router.post("/add-to-cart", fileUpload.single("product_image"), addToCartValidation.addToCartValidation, cartController.AddToCart);
router.get("/view-cart", cartController.viewCart);

router.post('/CartItems', cartController.getAllCartItems);

router.delete("/delete_CartItems/:id", cartController.DeleteCartItem);


module.exports = router;
