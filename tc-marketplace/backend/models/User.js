import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['buyer','seller','admin'], default: 'buyer' },
  verified: { type: Boolean, default: false }, // seller verification
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', userSchema);