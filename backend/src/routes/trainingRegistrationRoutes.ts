// src/routes/trainingRegistrationRoutes.ts
import express from "express";
import {
  getRegistrations,
  getPendingRegistrations,
  getApprovedRegistrations,
  createRegistration,
  updateStatus,
  deleteRegistration,
} from "../controllers/trainingController";

import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = express.Router();

/* ===============================
   PUBLIC
================================ */

// 🔓 peserta daftar training
router.post("/", createRegistration);

/* ===============================
   ADMIN ONLY (JWT)
================================ */

// 🔐 semua registration
router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getRegistrations
);

// 🔐 pending
router.get(
  "/pending",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getPendingRegistrations
);

// 🔐 approved
router.get(
  "/approved",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getApprovedRegistrations
);

// 🔐 update status
router.put(
  "/:id/status",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  updateStatus
);

// 🔐 delete
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  deleteRegistration
);

export default router;
