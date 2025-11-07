import User from "./user.model.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private - admin
export const listUsers = async (req, res) => {
    const users = await User.find().select('-password')
    res.status(200).json(users);
}

// @desc    Get user by email
// @route   POST /api/users
// @access  Private - user/admin
export const findUserByEmail = async (req, res) => {
    const { email } = req.body; 
    if (!email) {
        res.status(400)
        throw new Error('Email is required')
    }
    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('-password');

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.json(user);
}

// @desc    Update user
// @route   PUT /api/users
// @access  Private - user/admin
export const updateUser = async (req, res) => {
    const { id } = req.body

    const user = await User.findOne({ id })

    if(!user) {
        res.status(404)
        throw new Error ('User not found')
    }

    if(user.id.toString() !== req.user.id.toString()){
        res.status(403)
        throw new Error('Not authorized to delete user')
    }    
     
    Object.assign(user, req.body)
    
    const updated = user.save()
    res.json(updated);
}

export const deleteUser = async (req, res) => {

    const { id } = req.params

    const user = await User.findOne({ id })

    if(!user) {
        res.status(404)
        throw new Error ('User not found')
    }

    if(user.id.toString() !== req.user.id.toString()){
        res.status(403)
        throw new Error('Not authorized to delete user')
    }    
     
    await User.deleteOne(user)
    
    res.json({ message: "User deleted successfull" });
}
