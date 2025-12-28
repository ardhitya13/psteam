import { Router } from "express";
import { uploadTeam } from "../middleware/uploadTeam";
import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import {
  getTeams,
  createTeam,
  addMember,
  updateMember,
  deleteMember,
  deleteProject,
} from "../controllers/teamController";

const router = Router();

/* =====================================================
   PUBLIC — BOLEH DIAKSES TANPA LOGIN
===================================================== */

// 🔓 LIHAT SEMUA PROJECT TEAM (PUBLIC)
router.get("/", getTeams);

/* =====================================================
   PROTECTED — WAJIB LOGIN (ADMIN / SUPERADMIN)
===================================================== */

// 🔐 CREATE PROJECT — multiple images
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  uploadTeam.array("images"),
  createTeam
);

// 🔐 ADD MEMBER — single image
router.post(
  "/:id/member",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  uploadTeam.single("image"),
  addMember
);

// 🔐 UPDATE MEMBER — single image
router.put(
  "/member/:memberId",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  uploadTeam.single("image"),
  updateMember
);

// 🔐 DELETE MEMBER
router.delete(
  "/member/:memberId",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  deleteMember
);

// 🔐 DELETE PROJECT
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  deleteProject
);

export default router;
