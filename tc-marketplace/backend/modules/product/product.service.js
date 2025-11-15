import Product from './product.model.js'
import Variant from '../variant/variant.model.js'
import mongoose from 'mongoose';
import { errorHandler } from '../../middleware/errorMiddleware.js'; 
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
    p = await Product.findOne({ slug: id }).populate('seller', 'name').populate("categories", "_id name slug").populate("store", "name contactEmail contactPhone location");

    if(!p && mongoose.Types.ObjectId.isValid(id)){
        p = await Product.findById(id).populate('seller', 'name').populate("categories", "_id name slug").populate("store", "name contactEmail contactPhone location");
    }

    return p
}

export const getSellerProducts = async (id) => {

    const products = await Product.find({ seller: id })
        .populate("seller", "name email")   // adjust fields as needed
        .populate("categories", "_id name slug");

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


export const createProduct = async ({body}) => {
    const { variants } = body;
    
    const product = new Product({
      ...body, variants:[]
    });
    
    await product.save()
    
    let createdVariantIds =[]
    
    if (Array.isArray(variants) && variants.length > 0) {
      for (let v of variants) {
        
        const created = await Variant.create({
          ...v,
          product: product._id
        });
        createdVariantIds.push(created._id);
      }
      
      product.variants = createdVariantIds;
      await product.save();
    }
    
    
    const populatedProduct = await Product.findById(product._id)
    .populate("categories", "_id name slug")
    .populate("variants");
    
    return populatedProduct;
};

export const updateProduct = async (id, body) => {
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    return updated
};

export const deleteProduct = async (id) => {
    const p = await Product.findByIdAndDelete(id);
    return p
}