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

// PUBLIC - GET
router.get("/", getTeams);

// PUBLIC - POST / PUT / DELETE (no token)
router.post("/", createTeam);
router.post("/:id/member", addMember);
router.put("/member/:memberId", updateMember);
router.delete("/member/:memberId", deleteMember);
router.delete("/:id", deleteProject);

export default router;
