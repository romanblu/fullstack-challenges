import VariantSchema from '../variant/variant.model.js';

import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true, unique: true},
  species: {type: String},
  description: String,
  price: {type: Number},
  quantity: {type: Number},
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category"}],
  mainImage: String,
  images: [String],
  seller: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // TODO: create SuperUser model for seller and admin 
  store: {type: mongoose.Schema.Types.ObjectId, ref: "Store"}, // holds all aditional details about the seller 

  productType: {
    type: String,
    enum: ["plant", "consumable", "equipment", "kit", "digital"],
    required: true
  },
  // dynamic attributes
  attributes: {
    species: String,
    difficulty: String,
    mediaType: String,
    containerType: String,
    growthStage: String,
    shelfLife: String,
    certification: String
  },
  options: [
    {
      name: String,
      values: [String]
    }
  ],
  variants: [VariantSchema], // embedded subdocuments

  // out of stock, sale...
  status: { type: String, default: "available" },

  
  featured: { type: Boolean, default: false },
  createdAt: {type: Date, default: Date.now},
});


export default mongoose.model('Product', productSchema);