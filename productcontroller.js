const statusCodes = require("http-status-codes")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require ("mongoose")
const productmodels = require("../models/productmodels");


module.exports.addProduct = async (req, res) => {
  try {
    const { product_name, product_price, product_description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required"
      });
    }

    const productData = {
      product_name,  
      product_price,
      product_description,
      product_image: req.file.filename   // ✅ multer se file ka naam-
    };

    const addProduct = await productmodels.create(productData);

    res.json({
      success: true,
      message: "Product added successfully",
      data: addProduct
    });

  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// view product API

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await productmodels.find();

        if (!products || products.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: "No products found",
            });
        }

        res.status(statusCodes.OK).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// module.exports.EditProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;

//         if (!productId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Product ID is required"
//             });
//         }

//         // ✅ Validate ObjectId
//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid product ID"
//             });
//         }

//         // ✅ Prepare update data
//         const updateData = {
//             product_name: req.body.product_name,
//             product_price: req.body.product_price,
//             product_description: req.body.product_description
//         };

//         // ✅ Agar nayi image bheji hai to update karo
//         if (req.file) {
//             updateData.product_image = req.file.filename;
//         }

//         // ✅ Update product
//         const updated = await productmodels.findByIdAndUpdate(
//             productId,
//             { $set: updateData },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         return res.json({
//             success: true,
//             message: "Product updated successfully",
//             product: updated
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

const fs = require("fs");
const path = require("path");


module.exports.EditProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    // ✅ Check if product exists
    const product = await productmodels.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ✅ Prepare update data only with available fields
    const updateData = {};
    if (req.body.product_name) updateData.product_name = req.body.product_name;
    if (req.body.product_price) updateData.product_price = req.body.product_price;
    if (req.body.product_description) updateData.product_description = req.body.product_description;

    // ✅ Agar nayi image bheji hai to purani delete karke new set karo
    if (req.file) {
      if (product.product_image) {
        const oldPath = path.join(__dirname, "../uploads", product.product_image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath); // 🗑 purani image delete
        }
      }
      updateData.product_image = req.file.filename; // ✅ new image save
    }

    // ✅ Update product
    const updated = await productmodels.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Product updated successfully",
      product: updated
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// delete user API

module.exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const deleted = await productmodels.deleteOne({ _id: productId });

        if (deleted.deletedCount > 0) {
            return res.json({
                success: true,
                message: "Product deleted successfully"
            });
        } else {
            return res.json({
                success: false,
                message: "Product not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
