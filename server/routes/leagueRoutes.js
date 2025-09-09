import express from "express";
import {
  listLeagues,
  getLeague,
  createLeague,
  updateLeague,
  deleteLeague,
} from "../controllers/leagueController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listLeagues);
router.post("/", protect, admin, createLeague);
router.get("/:id", getLeague);
router.put("/:id", protect, admin, updateLeague);
router.delete("/:id", protect, admin, deleteLeague);

export default router;  
