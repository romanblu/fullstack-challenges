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
    const products = await Product.find(query).limit(100).populate('seller', 'name').select({images: {$slice: 1}});
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
  const  variants = Array.isArray(body.variants) ? body.variants : [];

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
    ...body,
    variants: variants.map(v => ({
      name: v.name,
      sku: v.sku?.trim() || undefined,
      price: Number(v.price),
      compareAtPrice: Number(v.compareAtPrice) || undefined,
      stock: Number(v.stock),
      optionValues: v.optionValues || [],
    }))
  });

  

  return product

};

export const updateProduct = async (id, body) => {
    const product = await Product.findById(id);
    if (!product) return null;

    product.title = body.title ?? product.title;
    product.description = body.description ?? product.description;
    product.options = body.options ?? product.options;
    product.price = body.price ?? product.price;
    product.quantity = body.quantity ?? product.quantity;
    product.mainImage = body.mainImage ?? product.mainImage;
    product.categories = body.categories ?? product.categories;

    product.variants = body.variants.map(v => ({
      _id: v._id || undefined,  // let mongoose assign ID for new ones
      name: v.name,
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      optionValues: v.optionValues
    }));
    console.log(product.variants)
    await product.save();

    return product;
};

// TODO: also delete variants 
export const deleteProduct = async (id) => {
    const p = await Product.findByIdAndDelete(id);
    return p
}