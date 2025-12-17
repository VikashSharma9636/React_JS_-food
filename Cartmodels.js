const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      default: 1,
    },
    product_image: {
      type: String,
    },
    // ✅ Extra fields (consistent with frontend)
    category_name: {
      type: String,
    },
    category_description: {
      type: String,
    },
    category_image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
