import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// ================= IMPORT ROUTES =================
import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRegistrationRoutes from "./routes/trainingRegistrationRoutes";
import trainingCRUDRoutes from "./routes/trainingCRUDRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import lecturerRoutes from "./routes/lecturerRoutes";
import researchRoutes from "./routes/researchRoutes";
import publicLecturerRoutes from "./routes/publicLecturer";

import { ensureSuperAdmin } from "./controllers/userController";

// ================= INIT =================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ================= STATIC =================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ================= ROUTES =================

// 🔓 PUBLIC (NO AUTH)
app.use("/api/public", publicLecturerRoutes);

// 🔐 PRIVATE
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/submissions", projectSubmissionRoutes);
app.use("/api/training", trainingCRUDRoutes);
app.use("/api/training-registrations", trainingRegistrationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/lecturer", lecturerRoutes);
app.use("/api/research", researchRoutes);

// ================= ROOT =================
app.get("/", (_req, res) => {
  res.json({ message: "API Running" });
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ================= START =================
app.listen(PORT, async () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  await ensureSuperAdmin();
});
