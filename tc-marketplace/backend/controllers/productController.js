import mongoose from 'mongoose';
import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const listProducts = async (req, res) => {
  const q = {};

  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };

  const products = await Product.find(q).limit(100).populate('seller', 'name');
  res.json(products);
};

// @desc    Get single product
// @route   GET /api/products/(:id || :slug)
// @access  Public
export const getProduct = async (req, res) => {
  const { id } = req.params
  let p = {}

  // find by ID or slug
  p = await Product.findOne({ slug: id }).populate('seller', 'name').populate("categories", "_id name slug");

  if(!p && mongoose.Types.ObjectId.isValid(id)){
    p = await Product.findById(id).populate('seller', 'name').populate("categories", "_id name slug");
  }

  if (!p)  {
    res.status(404)
    throw Error('Product not found')
  }
  res.status(200)
  res.json(p);
};

// @desc    Get all products by seller
// @route   GET /api/products/seller/:id 
// @access  Public
export const getSellerProducts = async (req, res) => {
  
  try{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }
  
    const products = await Product.find({ seller: id })
      .populate("seller", "name email")   // adjust fields as needed
      .populate("categories", "_id name slug");

    res.status(200).json(products);
  
  }catch (err) {
    console.error("Error fetching seller products:", err);
    res.status(500).json({ message: "Server error" });
  }
  
};

// @desc    Get featured products
// @route   GET /api/product/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try{
    const products = await Product.find({ 
      featured: true
    }).sort({ createdAt: -1})
    .limit(8)
    .select("name price slug image description seller")
    .populate('seller', 'name');
    
    if (!products) { 
      res.status(404)
      throw new Error('Product not found')
    }
    
    res.json(products);
  } catch (err){
    res.status(500).json({ message: "Failed getting featured products", error: err.message})
  }
};


// @desc    Create product
// @route   POST /api/products
// @access  Private - seller/admin
export const createProduct = async (req, res) => {
  const data = req.body;

  if(!data.price || !data.name){
    res.status(400)
    throw new Error('Title and price required')
  }

  data.seller = req.user.id; // from protect middleware

  const product = await Product.create(data);
  res.status(201).json(product);
};


// @desc    Update single product
// @route   PUT /api/products/:id
// @access  Private - seller/admin
export const updateProduct = async (req, res) => {
  try{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  }catch(err){
    res.status(500)
    throw new Error('Could not update product. ', err)
  }
};


// @desc    delete product
// @route   DELETE /api/products/:id
// @access  Private - seller/admin
export const deleteProduct = async (req, res) => {
  try{ 

    // TODO: validation for seller and user 

    const p = await Product.findByIdAndDelete(req.params.id);
    
    if(!p){
      res.status(404)
      throw new Error('Could not find product')
    }
    res.status(204)
    res.json({ "message": "deleted successfully" });
  }catch(err){
    res.status(500)
    throw new Error('Could not delete product. Error: ', err)
  }
};