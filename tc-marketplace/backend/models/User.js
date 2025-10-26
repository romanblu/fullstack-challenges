import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['buyer','seller','admin'], default: 'buyer' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('User', userSchema);