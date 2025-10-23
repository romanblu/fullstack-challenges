import User from "../models/User.js";

export const listUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users);
}

export const findUserByEmail = async (req, res) => {
    try {
    const { email } = req.body;
    console.log(email)
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


export const updateUser = async (req, res) => {
    console.log("body: ",req.body)
    const updated = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.json(updated);
}

export const deleteUser = async (req, res) => {

}
