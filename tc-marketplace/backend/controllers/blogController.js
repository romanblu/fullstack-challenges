import BlogPost from '../models/BlogPost.js';

export const listBlogPosts = async (req, res) => {
  const q = {};
  console.log("Getting all posts")
  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
  const blogPosts = await BlogPost.find(q).limit(100);
  res.json(blogPosts);
};

export const getBlogPost = async (req, res) => {
  const p = await BlogPost.findOne({ slug: req.params.slug }).populate('author', 'author name');
  if (!p)  return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

export const createBlogPost = async (req, res) => {
  const data = req.body;
  data.author = req.user.id; // from protect middleware
  const post = await BlogPost.create(data);
  res.json(post);
};

export const updateBlogPost = async (req, res) => {
  console.log("request body post:", req.body);
  const updated = await BlogPost.findOneAndUpdate({slug: req.params.slug}, req.body, { new: true });
  if (!updated) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  res.json(updated);
};

export const deleteBlogPost = async (req, res) => {
  const result = await BlogPost.findOneAndDelete(req.params.slug);
  if(!result) {
    return res.status(404).json({ message: 'Blog post not found' });
  }
  res.json({ ok: true });
};