const statusCodes = require("http-status-codes");
const CartModel = require("../models/Cartmodels"); // अपना cart model import करो

const ProductModel = require("../models/productmodels");

const CategoriesModel = require("../models/Categoriesmodels");




// controllers/CartController.js

// controllers/CartController.js

// module.exports.AddToCart = async (req, res) => {
//   try {
//     const { product_id, category_id, product_name, product_price, product_quantity, product_image } = req.body;

//     // ✅ check if same product+category already in cart
//     const existing = await CartModel.findOne({ product_id, category_id });

//     if (existing) {
//       existing.product_quantity += product_quantity || 1;
//       await existing.save();

//       return res.json({
//         success: true,
//         message: "Quantity updated in cart",
//         data: existing
//       });
//     }

//     // ✅ new insert
//     const cartItem = new CartModel({
//       product_id,
//       category_id,
//       product_name,
//       product_price,
//       product_quantity: product_quantity || 1,
//       product_image
//     });

//     await cartItem.save();

//     res.json({
//       success: true,
//       message: "Item added to cart",
//       data: cartItem
//     });
//   } catch (error) {
//     console.error("AddToCart Error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };



module.exports.AddToCart = async (req, res) => {
  try {
    const {
      product_id,
      category_id,
      product_name,
      product_price,
      product_quantity,
      product_image,
      category_name,
      category_description,
      category_image,
      action,
    } = req.body;

    // 🔍 पहले से cart में है या नहीं
    let existing = await CartModel.findOne({ product_id, category_id });

    if (existing) {
      if (action === "increment") {
        // ✅ हमेशा +1
        existing.product_quantity += 1;
      } else if (action === "decrement") {
        // ✅ हमेशा -1
        existing.product_quantity -= 1;
        if (existing.product_quantity <= 0) {
          await existing.deleteOne();
          return res.json({
            success: true,
            message: "Item removed from cart",
          });
        }
      } else if (product_quantity) {
        // direct set (rare case)
        existing.product_quantity = product_quantity;
      }

      await existing.save();
      return res.json({
        success: true,
        message: "Cart updated successfully",
        data: existing,
      });
    }

    // अगर item cart में नहीं है और decrement आया
    if (action === "decrement") {
      return res.json({
        success: false,
        message: "Item not found in cart to decrement",
      });
    }

    // ➕ नया item add
    const cartItem = new CartModel({
      product_id,
      category_id,
      product_name,
      product_price,
      product_quantity: product_quantity || 1,
      product_image,
      category_name,
      category_description,
      category_image,
    });

    await cartItem.save();

    res.json({
      success: true,
      message: "Item added to cart",
      data: cartItem,
    });
  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};





module.exports.viewCart = async (req, res) => {
  try {
    const cartItems = await CartModel.find()
      .populate("product_id")
      .populate("category_id");

    res.status(200).json({
      success: true,
      data: cartItems
    });
  } catch (error) {
    console.error("ViewCart Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// ✅ Get All Cart Items
module.exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartModel.find();

        if (!cartItems || cartItems.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: "No items in the cart",
            });
        }

        res.status(statusCodes.OK).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cartItems
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


module.exports.DeleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    if (!cartItemId) {
      return res.status(400).json({
        success: false,
        message: "Cart Item ID is required"
      });
    }

    const deleted = await CartModel.deleteOne({ _id: cartItemId });

    if (deleted.deletedCount > 0) {
      return res.json({
        success: true,
        message: "Cart item deleted successfully"
      });
    } else {
      return res.json({
        success: false,
        message: "Cart item not found"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
