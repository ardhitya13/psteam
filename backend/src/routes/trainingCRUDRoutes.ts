import { Router } from "express";
import {
  getAllTraining,
  createTraining,
  updateTraining,
  deleteTraining
} from "../controllers/trainingController";

const router = Router();

// GET semua pelatihan
router.get("/", getAllTraining);

// CREATE pelatihan
router.post("/", createTraining);

// UPDATE pelatihan
router.put("/:id", updateTraining);

// DELETE pelatihan
router.delete("/:id", deleteTraining);

export default router;
