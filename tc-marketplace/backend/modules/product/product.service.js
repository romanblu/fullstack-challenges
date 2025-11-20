import Product from './product.model.js'
import Variant from '../variant/variant.model.js'
import mongoose from 'mongoose';
import { parseDuplicateError } from './product.utils.js';
import ApiError from '../../utils/ApiError.js';

export const listProducts = async (filters) => {
    const query = {}

    if (filters?.title) query.title = { $regex: filters.title, $options: 'i' };
    
    if (filters?.category) {
        query.categories = filters.category;
    }

    if (filters?.seller) {
        query.seller = filters.seller;
    }
    const products = await Product.find(query).limit(100).populate('seller', 'name');
    return products
}

export const getProduct = async (id) => {
    let p = {}

    // find by ID or slug
    p = await Product.findOne({ slug: id })
        .populate('seller', 'name')
        .populate("categories", "_id name slug")
        .populate("store", "name contactEmail contactPhone location")
        .populate("variants");

    if(!p && mongoose.Types.ObjectId.isValid(id)){
        p = await Product.findById(id)
          .populate('seller', 'name')
          .populate("categories", "_id name slug")
          .populate("store", "name contactEmail contactPhone location")
          .populate("variants");
    }

    return p
}

export const getSellerProducts = async (id) => {
    const products = await Product.find({ seller: id })
        .populate("seller", "name email")   // adjust fields as needed
        .populate("categories", "_id name slug")
        .populate("variants");

    return products;  
};

export const getFeaturedProducts = async () => {

    const products = await Product.find({ 
      featured: true
    }).sort({ createdAt: -1})
    .limit(8)
    .select("name price slug image description seller")
    .populate('seller', 'name');

    return products
};

export const createProduct = async (body) => {
  const  variants = body.variants || [];

  // DB validations for product name and variants 
  const exists = await Product.findOne({ slug: body.slug });
  if (exists) throw ApiError.badRequest("Product slug already exists");
  // extract non empty SKUs
  const skus = variants.map(v => v.sku).filter(sku => typeof sku === "string" && sku.trim() !== "");
  // check for duplicate SKUs
  if(skus.length > 0){
    const skuExists = await Variant.findOne({ sku: { $in: skus } });
    if (skuExists) throw ApiError.badRequest(`SKU '${skuExists.sku}' already exists`);
  }

  const product = await Product.create({
    ...body, variants:[]
  });
  
  let createdVariantIds =[]

  try{
    if (Array.isArray(variants) && variants.length > 0) {
      for (let v of variants) {
        const data = {
          name: v.name,
          price: v.price,
          stock: v.stock,
          product: product._id
        }
        if(typeof v.sku === "string" && v.sku.trim() !== "")
          data.sku = v.sku

        const created = await Variant.create(data);
        createdVariantIds.push(created._id);
      }
      
      product.variants = createdVariantIds;
      await product.save();
    }
    
    const populatedProduct = await Product.findById(product._id)
    .populate("categories", "_id name slug")
    .populate("variants");
    
    return populatedProduct;
  } catch (err){
    // rollback
    await Variant.deleteMany({_id: {$in: createdVariantIds}})
    await Product.findByIdAndDelete(product._id)

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];

      // Convert duplicate key to readable error
      throw ApiError.badRequest(
        `${field} for ${err.keyValue[field]} already exists` 
      );
    }
    
    throw ApiError.internal(err.message)
  }

};

export const updateProduct = async (id, body) => {
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    return updated
};

// TODO: also delete variants 
export const deleteProduct = async (id) => {
    const p = await Product.findByIdAndDelete(id);
    return p
}