import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hash = async (plain) => bcrypt.hash(plain, 10);
export const compare = async (plain, hash) => bcrypt.compare(plain, hash);
export const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);