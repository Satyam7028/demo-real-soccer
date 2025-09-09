// server/routes/userRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  listUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

// Logged-in user profile
router.route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

// Admin: list all users
router.get("/", protect, admin, listUsers);

// Admin: manage individual users
router.route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin)
  .delete(protect, admin, deleteUser);

export default router;
