import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, required: true },
  excerpt: String,
  content: {type: String, required: true}, // Markdown
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  published: { type: Boolean, default: true },
  date: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('BlogPost', blogSchema);