import { Router, json } from "express";
import {
  // ===== LECTURER PROFILE =====
  getAllLecturers,
  getLecturerProfile,
  updateLecturerProfile,

  // ===== EDUCATION =====
  addEducationHistory,
  updateEducationHistory,
  deleteEducationHistory,

  // ===== RESEARCH =====
  getResearchByLecturer,
  addResearch,
  updateResearch,
  deleteResearch,

  // ===== COMMUNITY SERVICE (Pengabdian) =====
  getCommunityServiceByLecturer,
  addCommunityService,
  updateCommunityService,
  deleteCommunityService,

  // ===== SCIENTIFIC WORK =====
  getScientificWorkByLecturer,
  deleteScientificWork,
  saveScientificWorkBulk,

  // ===== INTELLECTUAL PROPERTY =====
  getIntellectualPropertyByLecturer,
  addIntellectualProperty,
  updateIntellectualProperty,
  deleteIntellectualProperty,
} from "../controllers/lecturerController";

import { uploadLecturer } from "../middleware/uploadLecturer";

const router = Router();

/* ======================================================
   LECTURER LIST
====================================================== */
router.get("/", getAllLecturers);

/* ======================================================
   LECTURER PROFILE
====================================================== */
router.get("/:userId", getLecturerProfile);

router.put(
  "/:userId/photo",
  uploadLecturer.single("photo"),
  updateLecturerProfile
);

router.put("/:userId", json(), updateLecturerProfile);

/* ======================================================
   RESEARCH CRUD  
====================================================== */
router.get("/:userId/research", getResearchByLecturer);
router.post("/:userId/research", addResearch);
router.put("/research/:id", updateResearch);
router.delete("/research/:id", deleteResearch);

/* ======================================================
   EDUCATION HISTORY
====================================================== */
router.post("/:userId/education", addEducationHistory);
router.put("/education/:id", updateEducationHistory);
router.delete("/education/:id", deleteEducationHistory);

/* ======================================================
   COMMUNITY SERVICE (PENGABDIAN)
====================================================== */
router.get("/:userId/community-service", getCommunityServiceByLecturer);
router.post("/:userId/community-service", addCommunityService);
router.put("/community-service/:id", updateCommunityService);
router.delete("/community-service/:id", deleteCommunityService);

/* ======================================================
   SCIENTIFIC WORK (KARYA ILMIAH)
====================================================== */
router.get("/lecturer/:userId/scientific-work",getScientificWorkByLecturer);
router.post("/lecturer/:userId/scientific-work/bulk",saveScientificWorkBulk);
router.delete("/scientific-work/:id",deleteScientificWork);

/* ======================================================
   INTELLECTUAL PROPERTY (HKI)
====================================================== */
router.get("/:userId/intellectual-property", getIntellectualPropertyByLecturer);
router.post("/:userId/intellectual-property", addIntellectualProperty);
router.put("/intellectual-property/:id", updateIntellectualProperty);
router.delete("/intellectual-property/:id", deleteIntellectualProperty);

export default router;
