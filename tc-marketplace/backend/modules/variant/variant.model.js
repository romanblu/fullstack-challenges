import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({

  name: { type: String, required: true },

  sku: { type: String, unique: true, sparse:true, trim: true },
  
  price: { type: Number, required: true },
  compareAtPrice: Number,
  cost: Number,
  stock: { type: Number, default: 0 },
  
  option1: String,
  option2:String,
  option3: String,

  unit: String,
  optionValues: [String],

  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },

  images: [String],
  status: { type: String, default: "active" }
}, { timestamps: true });

export default VariantSchema;