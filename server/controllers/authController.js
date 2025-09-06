// server/controllers/authController.js
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// POST /api/auth/register
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  });
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid email or password' });

  const token = generateToken(user._id);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  });
};

// GET /api/users/profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.json(user);
};

// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  if (req.body.password) user.password = req.body.password;

  await user.save();
  res.json({ message: 'Profile updated' });
};

// (Admin) GET /api/users
export const listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};
