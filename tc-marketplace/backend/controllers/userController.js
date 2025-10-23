import User from "../models/User.js";

export const listUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users);
}

export const getUserByEmail = async (req, res) => {
    try {
    const { email } = req.params;
        console.log("PARAMS ",req.params)
    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const registerUser = async (req, res) => {

}

export const updateUser = async (req, res) => {

}

export const deleteUser = async (req, res) => {

}
