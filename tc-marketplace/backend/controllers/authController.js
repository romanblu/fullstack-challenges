import User from '../models/User.js';
import { hash, compare, signToken } from '../utils/auth.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email exists' });
  const pw = await hash(password);
  const user = await User.create({ name, email, password: pw, role });
  const token = signToken({ id: user._id, role: user.role });
  res.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user._id, role: user.role });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
};