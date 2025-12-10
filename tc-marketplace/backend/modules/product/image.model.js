import mongoose from "mongoose";

const ProductImageSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store"
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null, // images uploaded but product not saved yet
    },

    sessionId: {
      type: String,
      default: null, // used for temporary product creation before the productId is available 
      index: true,
    },

    key: {
      type: String,
      required: true, // S3 key (folder path)
    },

    url: {
      type: String,
      required: true, 
    },

    order: {
      type: Number,
      default: 0, // image sort order in gallery
    },

    alt: {
      type: String,
      default: "",
    }
  },
  { timestamps: true } 
);

export default mongoose.model("ProductImage", ProductImageSchema);