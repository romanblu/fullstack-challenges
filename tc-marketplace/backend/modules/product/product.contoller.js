import mongoose from 'mongoose';
import Product from './product.model.js';
import Variant from '../variant/variant.model.js';
import asyncHandler from '../../utils/asyncHandler.js'
import * as productService from './product.service.js'
import ApiError from '../../utils/ApiError.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const listProducts = asyncHandler(async (req, res) => {
  const products = await productService.listProducts(req.query)
  res.json({products})
});

// @desc    Get single product
// @route   GET /api/products/(:id || :slug)
// @access  Public
export const getProduct = asyncHandler(async (req, res) => { 
  const product = await productService.getProduct(req.params.id)
  if(!product) throw ApiError.notFound("Product not found")
  res.status(200).json({product})
});

// @desc    Get all products by seller
// @route   GET /api/products/seller/:id 
// @access  Public
export const getSellerProducts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest(400, "Invalid seller ID")
  }

  const products = await productService.getSellerProducts(id)
  res.json(products);
};

// @desc    Get featured products
// @route   GET /api/product/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  const products = productService.getFeaturedProducts()
  if (!products) { 
    throw ApiError.internal("Failed to get featured products")
  }
  
  res.json(products);  
};


// @desc    Create product
// @route   POST /api/products
// @access  Private - seller/admin
export const createProduct = async (req, res) => {
  const {
    name,
    slug,
    species,
    description,
    price,
    quantity,
    mainImage,
    productType,
    categories,
    store,
    variants,
  } = req.body;
  
  if(!price || !name){
    throw ApiError.badRequest('Title and price required')
  }
  
  const seller = req.user.id; // from protect middleware
  
  const product = productService.createProduct({
    name,
    slug,
    species,
    description,
    price,
    quantity,
    mainImage,
    seller,
    store,
    productType,
    categories,
    store,
    variants
  });

  if(!product){
    throw ApiError.internal("Error creating a product")
  }

  res.json(product);
};


// @desc    Update single product
// @route   PUT /api/products/:id
// @access  Private - seller/admin
export const updateProduct = async (req, res) => {
    const updated = await productService.updateProduct(req.params.id, req.body);

    if(!updated){
      throw ApiError.internal("Could not update product")
    }

    res.json(updated);    
};


// @desc    delete product
// @route   DELETE /api/products/:id
// @access  Private - seller/admin
export const deleteProduct = async (req, res) => {
  
    // TODO: validation for seller and user 
    const p = await Product.findByIdAndDelete(req.params.id);
    
    if(!p){
      throw ApiError.notFound("Could not find product")
    }
    
    res.status(204).json({message: "Deleted successfuly"})
 
};