import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },

  name: { type: String, required: true },

  sku: { type: String, unique: true },
  price: { type: Number, required: true },
  compareAtPrice: Number,

  stock: { type: Number, default: 0 },

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

export default mongoose.model("Variant", VariantSchema);