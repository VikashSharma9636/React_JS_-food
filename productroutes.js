const express = require("express");
const productValidation = require("../validation/productvalidation");
const productController = require("../controller/productcontroller");
const { fileUpload } = require("../middleware/productupload"); // tumne export fileUpload kiya hai

const router = express.Router();

// ✅ Add Product (with image upload + validation)
router.post(
  "/add_product",
  fileUpload.single("product_image"),
  productValidation.productValidations,
  productController.addProduct
);

// view products
// ✅ Get All Products (GET use karna best hai)
router.post("/products", productController.getAllProducts);

// ✅ Edit Product by ID
router.post(
  "/edit_product/:id",
  fileUpload.single("product_image"), // optional agar edit me image bhi update karni hai
  productValidation.productValidations,
  productController.EditProduct
);





// ✅ Delete Product by ID
router.delete("/delete_product/:id", productController.deleteProduct);

module.exports = router;
