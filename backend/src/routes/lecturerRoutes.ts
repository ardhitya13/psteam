import { Router } from "express";
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
// UPDATE WITH PHOTO (DOSEN SENDIRI)
// ===========================
router.put(
  "/:userId/photo",
  uploadLecturer.single("photo"),
  updateLecturerProfile
);

// ===========================
// UPDATE WITHOUT PHOTO (ADMIN EDIT RIWAYAT DOSEN)
// ===========================
router.put("/:userId", updateLecturerProfile);

// EDUCATION CRUD
router.post("/:userId/education", addEducationHistory);
router.put("/education/:id", updateEducationHistory);
router.delete("/education/:id", deleteEducationHistory);

export default router;
