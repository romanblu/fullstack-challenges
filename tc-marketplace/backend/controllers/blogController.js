import slugify from 'slugify';
import BlogPost from '../models/BlogPost.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const listBlogPosts = async (req, res) => {
  const q = {};
  if (req.query.q) q.title = { $regex: req.query.q, $options: 'i' };
  try{
    const blogPosts = await BlogPost.find(q).limit(100).sort({ createdAt: -1 }).populate('author', 'name email');
    res.json(blogPosts);
  } catch (err){
    res.status(500).json({ message: "Failed to fetch blog posts", error: err.message });
  }
};

// @desc    Get authors blog posts
// @route   GET /api/blog/my-posts
// @access  Private - author
export const listMyBlogPosts = async (req, res) => {
  try{
    const blogPosts = await BlogPost.find({ author: req.user.id}).sort({ createdAt: -1 }).populate('author', 'name email');
    res.json(blogPosts);
  }catch (err){
    res.status(500).json({ message: "Failed to fetch blog posts", error: err.message });
  }
};



// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogPost = async (req, res) => {
  const p = await BlogPost.findOne({ slug: req.params.slug }).populate('author', 'name email');
  if (!p) { 
    res.status(404)
    throw new Error('Blog post not found')
  }

  res.json(p);
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private - author/admin
export const createBlogPost = async (req, res) => {
  const { title, content, image,excerpt, published} = req.body;
  if(!content || !title){
    res.status(400)
    throw new Error('Title and content are required')
  }

  const post = await BlogPost.create({
    title,
    content,
    image,
    excerpt,
    slug: slugify(title),
    author: req.user.id,
    published
  });

  res.json(post);
};

// @desc    Update blog post
// @route   PUT /api/blog/:slug
// @access  Private - author/admin
export const updateBlogPost = async (req, res) => {
  const { slug } = req.params
  const post = await BlogPost.findOne({ slug })

  if(!post){
    res.status(404)
    throw new Error('Blog post was not found')
  }
  console.log(req.user)
  if(post.author.toString() !== req.user.id.toString()){
    res.status(403)
    throw new Error('Only the author can edit this post')
  }

  Object.assign(post, req.body)
  const updated = await post.save()

  res.json(updated);
};

// @desc    delete a blog post
// @route   DELETE /api/blog/:slug
// @access  Private - author/admin
export const deleteBlogPost = async (req, res) => {
  const { slug } = req.params

  const post = await BlogPost.findOne({slug})
  if(!post) {
    res.status(404)
    throw new Error('Blog post not found')
  }

  
  if(post.author.toString() !== req.user.id) {
    res.status(403)
    throw new Error('Not authorized to delete the post')
  }

  await BlogPost.deleteOne(post);
  res.json({ message: "Post deleted successfull" });
};