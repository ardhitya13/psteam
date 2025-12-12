import { Router, json } from "express";
import {
  getAllLecturers,
  getLecturerProfile,
  updateLecturerProfile,
  addEducationHistory,
  updateEducationHistory,
  deleteEducationHistory,
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
// FIX TERPENTING: Paksa baca JSON
router.put("/:userId", json(), updateLecturerProfile);

// EDUCATION CRUD
router.post("/:userId/education", addEducationHistory);
router.put("/education/:id", updateEducationHistory);
router.delete("/education/:id", deleteEducationHistory);

export default router;
