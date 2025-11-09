import asyncHandler from '../../utils/asyncHandler.js'
import ApiError from '../../utils/ApiError.js'
import * as variantService from './variant.service.js'
import * as variantValidation from './variant.validation.js'

// @desc    Create variant
// @route   POST /api/variants
// @access  Private - admin
export const createVariant = asyncHandler(async (req, res) => {
  try{
    variantValidation.createVariant(req.body)
    const variant = await variantService.createVariant(req.body)
    res.json(variant);
  } catch (err){
    throw ApiError.badRequest(err.message)
  }
});

// @desc    Get all variants
// @route   GET /api/variants
// @access  Public
export const getVariants = asyncHandler(async (req, res) => {
  const variants = await variantService.getVariants();
  res.json(variants);
});

// @desc    Get variant by ID
// @route   GET /api/variants/:id
// @access  Public
export const getVariantById = asyncHandler( async (req, res) => {
    const variant = await variantService.getVariantById(req.params.id)
    if(!variant) throw ApiError.notFound('Variant not found')
    res.json(variant);
});

// @desc    Update variant
// @route   PUT /api/variants/:id
// @access  Private - admin
export const updateVariant = asyncHandler(async (req, res) => {
    const updated = variantService.updateVariant(req.user.id, req.body)
    res.json(updated);
  
});

// @desc    Get featured products
// @route   DELETE /api/variants/:id
// @access  Private - admin
export const deleteVariant = asyncHandler(async (req, res) => {
  const variant = variantService.deleteVariant(req.params.id)
  if(!variant) throw ApiError.notFound('Variant not found')
  res.json({ message: 'Variant deleted'})
});