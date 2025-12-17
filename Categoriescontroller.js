const statusCodes = require("http-status-codes");
const Categoriesmodels = require("../models/Categoriesmodels");

module.exports.AddCategories = async (req, res) => {
  try {
    const { Category_name,SKU_Category } = req.body;

    if (!Category_name) {
      return res.json({
        status: statusCodes.BAD_REQUEST,
        success: false,
        message: "category name is required"
      });
    }

    // ✅ Check for duplicate category under same product
    const findCategories = await Categoriesmodels.findOne({ 
      Category_name, 
      SKU_Category
    });
    if (findCategories) {
      return res.json({
        status: statusCodes.BAD_REQUEST,
        success: false,
        message: "Category already exists for this product"
      });
    }

    // ✅ Get filename from multer
    let fileName = null;
    if (req.file) {
      fileName = req.file.filename;
    }

    // ✅ Create category with product_id
    const userData = {
                      // 🔥 ये missing था
      Category_name,
      SKU_Category
    };

    const addCategories = await Categoriesmodels.create(userData);

    return res.json({
      status: statusCodes.OK,
      success: true,
      message: "Category added successfully",
      data: addCategories
    });

  } catch (error) {
    console.error("AddCategories Error:", error);
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};


// routes

// controller
module.exports.getCategoriesByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Categoriesmodels.find();  // ✅ product_id field se filter

    res.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// ✅ Edit Category
module.exports.editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; // ✅ Get ID from URL

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        // Prepare update data
        const updateData = {
            categories_name: req.body.categories_name,
            categories_price: req.body.categories_price,
            categories_description: req.body.categories_description
        };

        // If a file is uploaded, update image too
        if (req.file) {
            updateData.categories_image = req.file.filename;
        }

        const updated = await Categoriesmodels.updateOne({ _id: categoryId }, updateData);

        if (updated.modifiedCount > 0) {
            return res.json({
                success: true,
                message: "Category updated successfully"
            });
        } else {
            return res.json({
                success: false,
                message: "No changes made or category not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ✅ Delete Category
module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        const deleted = await Categoriesmodels.deleteOne({ _id: categoryId });

        if (deleted.deletedCount > 0) {
            return res.json({
                success: true,
                message: "Category deleted successfully"
            });
        } else {
            return res.json({
                success: false,
                message: "Category not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

