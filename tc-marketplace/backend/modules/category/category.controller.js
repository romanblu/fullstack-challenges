import Category from "./category.model.js";
import asyncHandler from '../../utils/asyncHandler.js'
import * as categoryService from './category.service.js'
import ApiError from '../../utils/ApiError.js'

// @desc    Create category
// @route   POST /api/categories
// @access  Private - admin
export const createCategory = asyncHandler(async (req, res) => {
  
  const category = await categoryService.createCategory(req.body);
  if(!category) throw ApiError.internal('Could not create category')
  res.json(category);
  
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories()
  if(!categories || categories.length === 0) throw ApiError.notFound('No categories found')
  res.json(categories);
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
      const category = await categoryService.getCategoryById(res.params.id)
      if(!category) throw ApiError.notFound('Could not find category')
      res.json(category);  
});


// @desc    Get category tree
// @route   PUT /api/categories/tree
// @access  Public
export const getCategoryTree = asyncHandler(async (req, res) => {
  const categoryTree = await categoryService.getCategoryTree()
  res.json(categoryTree);
});

// @desc    Update category
// @route   PUT /api/categories
// @access  Private - admin
export const updateCategory = asyncHandler(async (req, res) => {

  const updated = await categoryService.updateCategory(req.params.id, req.body);
  res.json(updated);

});

// @desc    Delete category
// @route   GET /api/categories/:id
// @access  Private - admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.deleteCategory(req.params.id);
  if(!category) throw ApiError.notFound('Category not found')
});