import User from '../models/User.js';
import { hash, compare, signToken } from '../utils/auth.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email) {
    res.status(400)
    throw new Error('Missing email')
  }
  
  if (!password) {
    res.status(400)
    throw new Error('Missing password')
  }

  const existing = await User.findOne({ email });

  if (existing) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const hashedPw = await hash(password);
  const user = await User.create({ name, email, password: hashedPw, role });
  const token = signToken({ id: user._id, role: user.role });

  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const ok = await compare(password, user.password);

  if (!ok)  {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const token = signToken({ id: user._id, role: user.role });
  res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
};