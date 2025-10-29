import express from 'express';
import { listBlogPosts, getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost, listMyBlogPosts } from '../controllers/blogController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();
router.get('/', listBlogPosts);
router.get('/my-posts',protect, requireRole('seller'), listMyBlogPosts);
router.get('/:slug', getBlogPost);
router.post('/', protect, requireRole('seller'), createBlogPost);
router.put('/:slug', protect, requireRole('seller'), updateBlogPost);
router.delete('/:slug', protect, requireRole('seller'), deleteBlogPost);
export default router;