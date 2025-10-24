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
  p = await Product.findOne({ slug: id }).populate('seller', 'name')

  if(!p && mongoose.Types.ObjectId.isValid(id)){
    p = await Product.findById(id).populate('seller', 'name')
  }

  if (!p)  {
    res.status(404)
    throw Error('Product not found')
  }
  res.status(200)
  res.json(p);
};


// @desc    Create product
// @route   POST /api/products
// @access  Private - seller/admin
export const createProduct = async (req, res) => {
  const data = req.body;

  if(!data.price || !data.title){
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

    res.json({ "message": "deleted successfully" });
  }catch(err){
    res.status(500)
    throw new Error('Could not delete product. Error: ', err)
  }
};