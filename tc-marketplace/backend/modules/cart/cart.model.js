import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
        productId: mongoose.Schema.Types.ObjectId,
        variantId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,

        storeId: mongoose.Schema.Types.ObjectId,
        image: String
    }
  ],

  subtotal: Number,
  expiresAt: Date
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);