const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
   {
  //   product_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Product",   // ✅ same as Product model name
  //     required: true
  //   },
    Category_name: { type: String, text: true , required: true },
    SKU_Category: { type: String, text: true, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
