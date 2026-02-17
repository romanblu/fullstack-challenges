import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: String,

  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    variantId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    storeId: mongoose.Schema.Types.ObjectId
  }],

  subtotal: Number,
  total: Number,

  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  paymentIntentId: String
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);