// src/routes/trainingRoutes.ts
import express from "express";
import multer from "multer";
import path from "path";

import {
  createTraining,
  getAllTraining,
  updateTraining,
  deleteTraining
} from "../controllers/trainingController";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads", "training"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// ROUTES
router.get("/", getAllTraining);
router.post("/", upload.single("thumbnail"), createTraining);
router.put("/:id", upload.single("thumbnail"), updateTraining);
router.delete("/:id", deleteTraining);

export default router;
