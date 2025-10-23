import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role && req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
};