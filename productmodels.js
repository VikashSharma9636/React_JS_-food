const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true, text: true },
    product_price: { type: Number, required: true, text: true },
    product_description: { type: String, text: true },
    product_image: { type: String, text: true },
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// ✅ Always use singular + PascalCase for ref
module.exports = mongoose.model("Product", ProductSchema);
