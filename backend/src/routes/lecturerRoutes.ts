import { Router, json } from "express";
import {
  getAllLecturers,
  getLecturerProfile,
  updateLecturerProfile,

  addEducationHistory,
  updateEducationHistory,
  deleteEducationHistory,

  addResearch,
  updateResearch,
  deleteResearch,

  addCommunityService,
  updateCommunityService,
  deleteCommunityService,

  addScientificWork,
  updateScientificWork,
  deleteScientificWork,

  addIntellectualProperty,
  updateIntellectualProperty,
  deleteIntellectualProperty,
} from "../controllers/lecturerController";

import { uploadLecturer } from "../middleware/uploadLecturer";

const router = Router();

// GET ALL
router.get("/", getAllLecturers);

// GET ONE PROFILE
router.get("/:userId", getLecturerProfile);

// ===========================
// UPDATE PROFIL + FOTO (Dosen sendiri)
// ===========================
router.put(
  "/:userId/photo",
  uploadLecturer.single("photo"),
  updateLecturerProfile
);

// ===========================
// UPDATE PROFIL TANPA FOTO (Admin)
// ===========================

router.put("/:userId", json(), updateLecturerProfile);

// EDUCATION CRUD
router.post("/:userId/education", addEducationHistory);
router.put("/education/:id", updateEducationHistory);
router.delete("/education/:id", deleteEducationHistory);

// RESEARCH CRUD
router.post("/lecturer/:userId/research", addResearch);
router.put("/research/:id", updateResearch);
router.delete("/research/:id", deleteResearch);

// COMUNITY SERVICE CRUD
router.post("/lecturer/:userId/community-service", addCommunityService);
router.put("/community-service/:id", updateCommunityService);
router.delete("/community-service/:id", deleteCommunityService);

// SCIENTIFICWORK CRUD 
router.post("/lecturer/:userId/scientific-work", addScientificWork);
router.put("/scientific-work/:id", updateScientificWork);
router.delete("/scientific-work/:id", deleteScientificWork);

// INTELLECTUAL PROPERTY CRUD
router.post("/lecturer/:userId/intellectual-property", addIntellectualProperty);
router.put("/intellectual-property/:id", updateIntellectualProperty);
router.delete("/intellectual-property/:id", deleteIntellectualProperty);


export default router;
