import User from "./user.model.js";
import * as userService from './user.service.js'
import asyncHandler from '../../utils/asyncHandler.js'
import ApiError from "../../utils/ApiError.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private - admin
export const listUsers = asyncHandler(async (req, res) => {
    
    const users = await userService.listUsers()
    res.status(200).json(users);

})

// @desc    Get user by email
// @route   POST /api/users
// @access  Private - user/admin
export const findUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.body; 
    if (!email) {
        throw ApiError.badRequest('Email is required')
    }
    // Find user by email (case-insensitive)
    const user = await userService.findUserByEmail(email)

    if (!user) {
        throw ApiError.notFound('User not found')
    }

    res.status(200).json(user);
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private - user/admin
export const updateUser = asyncHandler( async (req, res) => {
    // TODO: add separate validation for IDs (request and params) also do not allow to update password or email
    const { id } = req.params
    if(req.user.id !== id ) throw ApiError.unauthorized("You are unauthorized to change this user")

    const user = await userService.updateUser(id, req.user.id, req.body)

    if(!user) {
        throw ApiError.notFound('User not found')
    }
    res.status(200).json(user);
    
})

export const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params

    if(id !== req.user.id){
        throw ApiError.unauthorized("You are not authorized to delete this user")
    }

    const user = userService.deleteUser(id)
    if(!user) throw ApiError.notFound('User not found')
        
    res.json({ message: "User deleted successfull" });
})
