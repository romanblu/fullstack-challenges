import Variant from "../models/Variant.js";

// CREATE
export const createVariant = async (req, res) => {
  try {
    const variant = await Category.create(req.body);
    res.json(variant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
export const getVariants = async (req, res) => {
  const variants = await Variant.find().populate("parent");
  res.json(variants);
};

// UPDATE
export const updateVariant = async (req, res) => {
  try {
    const updated = await Variant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteVariant = async (req, res) => {
  try {
    await Variant.findByIdAndDelete(req.params.id);
    res.json({ message: "Variant deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};