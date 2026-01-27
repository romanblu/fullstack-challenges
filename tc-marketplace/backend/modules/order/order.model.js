import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,

  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      variantId: mongoose.Schema.Types.ObjectId,

      storeId: mongoose.Schema.Types.ObjectId,

      name: String,
      variantName: String,

      price: Number,
      quantity: Number
    }
  ],

  total: Number,
  status: { type: String, default: "pending" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);