import { Router } from "express";
import { uploadTeam } from "../middleware/uploadTeam";
import {
  getTeams,
  createTeam,
  addMember,
  updateMember,
  deleteMember,
  deleteProject,
} from "../controllers/teamController";

const router = Router();

// CREATE PROJECT — multiple images
router.post("/", uploadTeam.array("images"), createTeam);

// ADD MEMBER — single image
router.post("/:id/member", uploadTeam.single("image"), addMember);

// UPDATE MEMBER — single image
router.put("/member/:memberId", uploadTeam.single("image"), updateMember);

// GET & DELETE
router.get("/", getTeams);
router.delete("/member/:memberId", deleteMember);
router.delete("/:id", deleteProject);

export default router;
