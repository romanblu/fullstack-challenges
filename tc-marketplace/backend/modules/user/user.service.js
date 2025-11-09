import User from './user.model.js'



export const listUsers = async (req, res) => {
    const users = await User.find().select('-password')
    return users;
}

export const findUserByEmail = async (email) => {
    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('-password');
    return user
}

export const updateUser = async (userId, data) => {
    const user = await User.findById( userId )

    if(!user) return null

    Object.assign(user, data)
    
    const updated = user.save()

    return updated
}

export const deleteUser = async (id) => {
    const user = await User.findOneAndDelete(id)
    return user 
    
}