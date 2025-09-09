import express from "express";
import {
  listFixtures,
  getFixture,
  createFixture,
  updateFixture,
  deleteFixture,
} from "../controllers/fixtureController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listFixtures);
router.post("/", protect, admin, createFixture);
router.get("/:id", getFixture);
router.put("/:id", protect, admin, updateFixture);
router.delete("/:id", protect, admin, deleteFixture);

export default router;  
