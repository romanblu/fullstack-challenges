import User from '../models/User.js';
import { hash, compare, signToken } from '../utils/auth.js';
import logger from '../utils/logger.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!email) {
    res.status(400)
    throw new Error('Missing email')
  }
  
  if (!password) {
    res.status(400)
    throw new Error('Missing password')
  }

  if (!name) {
    res.status(400)
    throw new Error('Missing name')
  }

  const existing = await User.findOne({ email });

  if (existing) {
    res.status(400)
    throw new Error('Email already exists')
  }


  const hashedPw = await hash(password);
  const user = await User.create({ name, email, password: hashedPw, role, phone });
  const token = signToken({ id: user._id, user: user });

  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role, phone: user.phone }, token });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  logger.info(`Login attempt for ${email}`);
  
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