// server/routes/authRoutes.js
import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register route with validation
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars password'),
  ],
  register
);

// Login route
router.post('/login', login);

export default router;
