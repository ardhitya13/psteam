import { Router, json } from "express";
import {
  getAllLecturers,
  getLecturerProfile,
  updateLecturerProfile,

  addEducationHistory,
  updateEducationHistory,
  deleteEducationHistory,

  getResearchByLecturer,
  addResearch,
  addResearchByAdmin,
  updateResearch,
  deleteResearch,

  getCommunityServiceByLecturer,
  addCommunityService,
  updateCommunityService,
  deleteCommunityService,

  getScientificWorkByLecturer,
  saveScientificWorkBulk,
  deleteScientificWork,
  updateScientificWork, // ✅ WAJIB ADA

  getIntellectualPropertyByLecturer,
  addIntellectualProperty,
  updateIntellectualProperty,
  deleteIntellectualProperty,
} from "../controllers/lecturerController";

import { uploadLecturer } from "../middleware/uploadLecturer";
import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import { allowSelfOrAdmin } from "../middleware/ownershipMiddleware";
import { allowResearchOwnerOrAdmin } from "../middleware/researchOwnerMiddleware";
import { allowCommunityServiceOwnerOrAdmin } from "../middleware/communityServiceOwnerMiddleware";
import { allowScientificWorkOwnerOrAdmin } from "../middleware/scientificWorkOwnerMiddleware";
import { allowIntellectualPropertyOwnerOrAdmin } from "../middleware/allowIntellectualPropertyOwnerOrAdmin"; // ✅ TAMBAHAN SAJA

const router = Router();

/* ======================================================
   LECTURER LIST (ADMIN ONLY)
====================================================== */
router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  getAllLecturers
);

/* ======================================================
   LECTURER PROFILE
====================================================== */
router.get(
  "/:userId",
  authMiddleware,
  allowSelfOrAdmin,
  getLecturerProfile
);

router.put(
  "/:userId/photo",
  authMiddleware,
  allowSelfOrAdmin,
  uploadLecturer.single("photo"),
  updateLecturerProfile
);

router.put(
  "/:userId",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  updateLecturerProfile
);

/* ======================================================
   RESEARCH ✅ (OWNER BASED)
====================================================== */
router.get(
  "/:userId/research",
  authMiddleware,
  allowSelfOrAdmin,
  getResearchByLecturer
);

router.post(
  "/:userId/research",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  addResearch
);

router.post(
  "/:userId/research/admin",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  json(),
  addResearchByAdmin
);

router.put(
  "/research/:id",
  authMiddleware,
  allowResearchOwnerOrAdmin,
  json(),
  updateResearch
);

router.delete(
  "/research/:id",
  authMiddleware,
  allowResearchOwnerOrAdmin,
  deleteResearch
);

/* ======================================================
   EDUCATION
====================================================== */
router.post(
  "/:userId/education",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  addEducationHistory
);

router.put(
  "/education/:id",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  updateEducationHistory
);

router.delete(
  "/education/:id",
  authMiddleware,
  allowSelfOrAdmin,
  deleteEducationHistory
);

/* ======================================================
   COMMUNITY SERVICE ✅ (OWNER BASED)
====================================================== */
router.get(
  "/:userId/community-service",
  authMiddleware,
  allowSelfOrAdmin,
  getCommunityServiceByLecturer
);

router.post(
  "/:userId/community-service",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  addCommunityService
);

router.put(
  "/community-service/:id",
  authMiddleware,
  allowCommunityServiceOwnerOrAdmin,
  json(),
  updateCommunityService
);

router.delete(
  "/community-service/:id",
  authMiddleware,
  allowCommunityServiceOwnerOrAdmin,
  deleteCommunityService
);

/* ======================================================
   SCIENTIFIC WORK ✅ (OWNER BASED — FIX)
====================================================== */
router.get(
  "/:userId/scientific-work",
  authMiddleware,
  allowSelfOrAdmin,
  getScientificWorkByLecturer
);

router.post(
  "/:userId/scientific-work/bulk",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  saveScientificWorkBulk
);

router.put(
  "/scientific-work/:id",
  authMiddleware,
  allowScientificWorkOwnerOrAdmin, // ✅ FIX
  json(),
  updateScientificWork
);

router.delete(
  "/scientific-work/:id",
  authMiddleware,
  allowScientificWorkOwnerOrAdmin, // ✅ FIX
  deleteScientificWork
);

/* ======================================================
   INTELLECTUAL PROPERTY ✅ (OWNER BASED — FINAL FIX)
====================================================== */
router.get(
  "/:userId/intellectual-property",
  authMiddleware,
  allowSelfOrAdmin,
  getIntellectualPropertyByLecturer
);

router.post(
  "/:userId/intellectual-property",
  authMiddleware,
  allowSelfOrAdmin,
  json(),
  addIntellectualProperty
);

router.put(
  "/intellectual-property/:id",
  authMiddleware,
  allowIntellectualPropertyOwnerOrAdmin, // ✅ SATU-SATUNYA PERUBAHAN LOGIKA
  json(),
  updateIntellectualProperty
);

router.delete(
  "/intellectual-property/:id",
  authMiddleware,
  allowIntellectualPropertyOwnerOrAdmin, // ✅ SATU-SATUNYA PERUBAHAN LOGIKA
  deleteIntellectualProperty
);

export default router;
