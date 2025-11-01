import Category from "../models/Category.js";

// @desc    Create category
// @route   POST /api/category
// @access  Private - admin
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all categories
// @route   GET /api/category
// @access  Public
export const getCategories = async (req, res) => {
  const categories = await Category.find().populate("parent");
  res.json(categories);
};

// @desc    Get category by ID
// @route   GET /api/category/:id
// @access  Public
export const getCategoryById = async (req, res) => {
    try{
        const category = await Category.findById(res.params.id).populate("parent");
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


// @desc    Update category
// @route   PUT /api/category
// @access  Private - admin
export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete category
// @route   GET /api/category/:id
// @access  Private - admin
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};