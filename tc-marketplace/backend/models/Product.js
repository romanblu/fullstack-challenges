
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: {type: String, required: true, require: true},
  slug: {type: String, required: true, unique: true},
  // store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  species: {type: String, required: true},
  description: String,
  price: {type: Number, required: true},
  quantity: {type: Number},
  image: String,
  seller: String,
  featured: { type: Boolean, default: false },
  createdAt: {type: Date, default: Date.now},
});


export default mongoose.model('Product', productSchema);