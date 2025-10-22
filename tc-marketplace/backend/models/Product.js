
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: {type: String, required: true, require: true},
  slug: {type: String, required: true, unique: true},
  species: {type: String, required: true},
  description: String,
  price: {type: Number, required: true},
  quantity: {type: Number},
  image: String,
  seller: String,
  createdAt: {type: Date, default: Date.now},
});


export default mongoose.model('Product', productSchema);