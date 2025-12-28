import { Router } from "express";
import {
  createSubmission,
  getApprovedSubmissions,
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
  updateSubmissionStatus,
} from "../controllers/projectSubmissionController";

import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

/* ===============================
   PUBLIC (TANPA LOGIN)
================================ */
router.post("/", createSubmission);

/* ===============================
   ADMIN ONLY (JWT + ROLE)
================================ */
router.get(
  "/pending",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getPendingSubmissions
);

router.get(
  "/approved",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getApprovedSubmissions
);

router.patch(
  "/:id/approve",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  approveSubmission
);

router.patch(
  "/:id/reject",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  rejectSubmission
);

router.patch(
  "/:id/update-status",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  updateSubmissionStatus
);

export default router;
