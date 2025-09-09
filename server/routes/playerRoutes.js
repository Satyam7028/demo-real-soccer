// server/routes/playerRoutes.js
import express from "express";
import {
  listPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTopScorers,
} from "../controllers/playerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();   

// Special route: Top scorers
router.get("/topscorers", getTopScorers);

// CRUD routes
router.get("/", listPlayers);
router.post("/", protect, admin, createPlayer);
router.get("/:id", getPlayer);
router.put("/:id", protect, admin, updatePlayer);
router.delete("/:id", protect, admin, deletePlayer);

export default router;  
