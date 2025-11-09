import User from '../user/user.model.js';
import { hash, compare, signToken } from '../../utils/auth.js';
import logger from '../../utils/logger.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { validateLogin, validateRegister } from './auth.validation.js';
import { loginUser, registerUser } from './auth.service.js';
import ApiError from '../../utils/ApiError.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler( async (req, res) => {
  try{
    validateRegister(req.body)
    const { user, token } = await registerUser(req.body);
    res.status(201).json({user, token})
  } catch (err) {
    throw ApiError.badRequest(err.message)
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  try{
    validateLogin(req.body)

    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password)

    res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role, store: user.store || null } });
  } catch(err){
    throw ApiError.badRequest(err.message)
  }
});