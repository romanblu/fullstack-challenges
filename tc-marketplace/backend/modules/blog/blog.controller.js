import slugify from 'slugify';
import BlogPost from './blog.model.js';
import generateAutoSlug from '../../utils/slugGenHelper.js';
import * as blogService from './blog.service.js'
import * as blogValidation from './blog.validation.js'
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const listBlogPosts = asyncHandler(async (req, res) => {
  try{
    const blogPosts = await blogService.listBlogPosts(req.query)
    res.json(blogPosts);
  } catch (err){
    throw ApiError.internal(err.message)
  }
});

// @desc    Get authors blog posts
// @route   GET /api/blog/my-posts
// @access  Private - author
export const listMyBlogPosts = asyncHandler( async (req, res) => {
  try{
    const blogPosts = await blogService.listMyBlogPosts(req.user.id)
    res.json(blogPosts);
  }catch (err){
    throw ApiError.internal(err.message)
  }
});


// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogPost = asyncHandler(async (req, res) => {
  try{
    const p = await blogService.getBlogPost(req.params.slug)
    if (!p) { 
      throw ApiError.notFound('Blog post not found')
    }
    res.json(p);
  } catch(err){
    throw ApiError.internal( err.message)
  }
});

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
export const getFeaturedPosts = asyncHandler( async (req, res) => {
  try{
    const posts = await blogService.getFeaturedPosts()
    res.json(posts);
  } catch (err){
    throw ApiError(err.message)
  }
});



// @desc    Create blog post
// @route   POST /api/blog
// @access  Private - author/admin
export const createBlogPost = asyncHandler( async (req, res) => {
  try{
    blogValidation.validateCreatePost(req.body)
    const userId = req.user.id
    const post = await blogService.createBlogPost(req.body, userId)
    res.status(201).json(post);
  } catch (err) {
    throw ApiError.internal(err.message)
  }
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private - author/admin
export const updateBlogPost = asyncHandler(async (req, res) => {
  try{
    const updatedPost = blogService.updateBlogPost(req.body, req.user.id)    
    res.json(updatedPost)
  } catch (err){
    console.error("Blog update error: ",err)
    throw ApiError(err.message)
  }
});

// @desc    delete a blog post
// @route   DELETE /api/blog/:slug
// @access  Private - author/admin
export const deleteBlogPost = asyncHandler(async (req, res) => {
  const { slug } = req.params
  try{
    await blogService.deleteBlogPost(slug, req.user.id)
  } catch(err){
    if(err.message === 'Not found'){
      throw ApiError.notFound("Post not found")
    }
    if(err.message === 'Unauthorized'){
      throw ApiError.unauthorized()
    }
  }
  res.json({ message: "Post deleted successfull" });
});