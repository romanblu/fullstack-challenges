import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: String, // Markdown
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('BlogPost', blogSchema);