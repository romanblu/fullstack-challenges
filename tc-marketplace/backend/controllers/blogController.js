import slugify from 'slugify';
import BlogPost from '../models/BlogPost.js';
import generateAutoSlug from '../utils/slugGenHelper.js';

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

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
export const getFeaturedPosts = async (req, res) => {
  try{
    const posts = await BlogPost.find({ 
      published: true,
      featured: true
    }).sort({ createdAt: -1})
    .limit(3)
    .select("title slug image excerpt author createdAt")
    .populate('author', 'name');
    
    if (!posts) { 
      res.status(404)
      throw new Error('Blog post not found')
    }
    
    res.json(posts);
  } catch (err){
    res.status(500).json({ message: "Failed getting featured posts", error: err.message})
  }
};



// @desc    Create blog post
// @route   POST /api/blog
// @access  Private - author/admin
export const createBlogPost = async (req, res) => {
  try{

    const { title, content, image,excerpt, published} = req.body;
    
    if(!content || !title){
      return res.status(400).json({ error: "Title and content are required" });
    }
    
    let slug = slugify(title, { lower: true, strict: true });

    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = generateAutoSlug(title);
    }
    
    
    const post = await BlogPost.create({
      title,
      content,
      image,
      excerpt,
      slug,
      author: req.user.id,
      published: published ?? false,
      date: new Date()
      });
      
      res.status(201).json(post);
    } catch (err) {
      console.error("Create blog error:", err);
      res.status(500).json({ error: 'Server error creating a new post'})
    }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private - author/admin
export const updateBlogPost = async (req, res) => {
  
  try{
    const {id, slug, title} = req.body
    const post = await BlogPost.findById( id )

    if(!post){
      res.status(404).json({ error: 'Blog post was not found'})
    }

    if(post.author.toString() !== req.user.id.toString()){
      res.status(403).json({ error: 'Only the author can edit this post'})
    }
    
    let newSlug = slug

    // check for duplicates only if slug changed
    if(slug && slug !== post.slug){
      const conflict = BlogPost.findOne({ slug: slug, _id: { $ne: post._id }})

      if(conflict){
        newSlug = generateAutoSlug(slug || title)
      }
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.image = req.body.image ?? post.image;
    post.excerpt = req.body.excerpt ?? post.excerpt;
    post.tags = req.body.tags ?? post.tags;
    post.published = req.body.published ?? post.published;
    post.slug = newSlug ?? post.slug;

    const updated = await post.save()
    
    res.json(updated);
    
  } catch (err){
    console.error("Blog update error: ",err)
    res.status(500).json({ error: "Server error updating blog post" });
  }


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