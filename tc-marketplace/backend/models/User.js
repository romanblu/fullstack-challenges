import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['buyer','seller','admin'], default: 'buyer' },
  
  
   // Seller-only fields
  storeName: { type: String, required: function() { return this.role === "seller"; } },
  contactEmail: { type: String },
  contactPhone: { type: String },
  location: {type: String }, 
  profilePicture: {type: String },  
  description: { type: String },
  storeSlug: { type: String },
  category: { type: String },
  verified: { type: Boolean, default: false }, // seller verification

  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', userSchema);