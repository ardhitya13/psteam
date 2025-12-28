import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

import {
  createTraining,
  getAllTraining,
  updateTraining,
  deleteTraining,
  getTrainingById,
} from "../controllers/trainingController";

const router = express.Router();

/* ===============================
   ENSURE UPLOAD FOLDER EXISTS
================================ */
const uploadDir = path.join(process.cwd(), "uploads", "training");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===============================
   MULTER CONFIG (SAFE)
================================ */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.fieldname + "-" + Date.now() + ext;
    cb(null, safeName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

/* ===============================
   PUBLIC ROUTES
================================ */

// 🔓 lihat semua training
router.get("/", getAllTraining);

// 🔓 detail training
router.get("/:id", getTrainingById);

/* ===============================
   ADMIN ONLY (JWT)
================================ */

// 🔐 create training
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  upload.single("thumbnail"),
  createTraining
);

// 🔐 update training (WAJIB UPDATE, BUKAN CREATE)
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  upload.single("thumbnail"),
  updateTraining
);

// 🔐 delete training
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  deleteTraining
);

export default router;
