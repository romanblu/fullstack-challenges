import Variant from "../models/Variant.js";

// @desc    Create variant
// @route   POST /api/variant
// @access  Private - admin
export const createVariant = async (req, res) => {
  try {
    const variant = await Category.create(req.body);
    res.json(variant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all variants
// @route   GET /api/variant
// @access  Public
export const getVariants = async (req, res) => {
  const variants = await Variant.find().populate("parent");
  res.json(variants);
};

// @desc    Get variant by ID
// @route   GET /api/variant/:id
// @access  Public
export const getVariantById = async (req, res) => {
    try{
        const variant = await Variant.findById(req.params.id).populate("parent");
        res.json(variant);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// @desc    Update variant
// @route   PUT /api/variant/:id
// @access  Private - admin
export const updateVariant = async (req, res) => {
  try {
    const updated = await Variant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get featured products
// @route   DELETE /api/variant/:id
// @access  Private - admin
export const deleteVariant = async (req, res) => {
  try {
    await Variant.findByIdAndDelete(req.params.id);
    res.json({ message: "Variant deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};