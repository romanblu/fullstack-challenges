import Product from '../models/Product.js';
export const listProducts = async (req, res) => {
  const q = {};
  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
  const products = await Product.find(q).limit(100);
  res.json(products);
};
export const getProduct = async (req, res) => {
  const p = await Product.findOne({ slug: req.params.slug }).populate('seller', 'name email');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};
export const createProduct = async (req, res) => {
  const data = req.body;
  data.seller = req.user.id; // from protect middleware
  const product = await Product.create(data);
  res.json(product);
};
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};