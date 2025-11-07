import Category from "./category.model.js";

// @desc    Create category
// @route   POST /api/categories
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
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  const categories = await Category.find().populate("parent");
  res.json(categories);
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
    try{
        const category = await Category.findById(res.params.id).populate("parent");
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};


// @desc    Get category tree
// @route   PUT /api/categories/tree
// @access  Public
export const getCategoryTree = async (req, res) => {
  const categories = await Category.find().lean();

  const map = {};
  categories.forEach(cat => (map[cat._id] = { ...cat, children: [] }));

  const tree = [];

  categories.forEach(cat => {
    if (cat.parent) {
      map[cat.parent]?.children.push(map[cat._id]);
    } else {
      tree.push(map[cat._id]);
    }
  });

  res.json(tree);
};

// @desc    Update category
// @route   PUT /api/categories
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
// @route   GET /api/categories/:id
// @access  Private - admin
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};