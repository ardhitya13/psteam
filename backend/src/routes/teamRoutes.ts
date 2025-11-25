// routes/teamRoutes.ts
import { Router } from "express";
import {
  getTeams,
  createTeam,
  addMember,
  updateMember,
  deleteMember,
  deleteProject,
} from "../controllers/teamController";

const router = Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.post("/:id/member", addMember);
router.put("/member/:memberId", updateMember);
router.delete("/member/:memberId", deleteMember);
router.delete("/:id", deleteProject);

export default router;
