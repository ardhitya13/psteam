import { Router } from "express";
import {
  getTeams,
  createTeam,
  addMember,
  updateMember,
  deleteMember,
  deleteProject,
} from "../controllers/teamController";

import { uploadTeam } from "../middleware/uploadTeam";   // <-- tambah

const router = Router();

// CREATE PROJECT (banyak foto)
router.post("/", uploadTeam.array("images"), createTeam);

// ADD MEMBER (foto tunggal)
router.post("/:id/member", uploadTeam.single("image"), addMember);

// UPDATE MEMBER (foto tunggal)
router.put("/member/:memberId", uploadTeam.single("image"), updateMember);

router.get("/", getTeams);
router.delete("/member/:memberId", deleteMember);
router.delete("/:id", deleteProject);

export default router;
