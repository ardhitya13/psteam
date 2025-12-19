import { Router } from "express";
import {
  getResearchByLecturer,
  addResearch,
  updateResearch,
  deleteResearch
} from "../controllers/researchController";

const router = Router();

// GET all research for lecturer
router.get("/:userId", getResearchByLecturer);

// ADD research
router.post("/:userId", addResearch);

// UPDATE
router.put("/item/:id", updateResearch);

// DELETE
router.delete("/item/:id", deleteResearch);

export default router;
