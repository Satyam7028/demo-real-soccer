// server/routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { getProfile, updateProfile, listUsers } from '../controllers/authController.js';

const router = express.Router();

// Get logged-in user profile
router.get('/profile', protect, getProfile);

// Update logged-in user profile
router.put('/profile', protect, updateProfile);

// Admin-only list (simple check in handler)
router.get('/', protect, async (req, res) => {
  const me = await User.findById(req.user.userId);
  if (me?.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  return listUsers(req, res);
});

export default router;
