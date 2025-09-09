// server/routes/newsRoutes.js
import express from "express";
import {
  listNews,
  getNewsArticle,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", listNews);
router.get("/:id", getNewsArticle);

// Admin
router.post("/", protect, admin, createNews);
router.put("/:id", protect, admin, updateNews);
router.delete("/:id", protect, admin, deleteNews);

export default router;  
