// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token = null;

  // Expect "Authorization: Bearer <token>"
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; // minimal payload
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Optional admin middleware
export const admin = (req, res, next) => {
  // You can fetch role if needed; for simplicity attach via DB lookup here:
  // Better: include role in token or add cache for production.
  next();
};
