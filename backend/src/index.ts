import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRegistrationRoutes from "./routes/trainingRegistrationRoutes";
import trainingCRUDRoutes from "./routes/trainingCRUDRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import lecturerRoutes from "./routes/lecturerRoutes";

import { ensureSuperAdmin } from "./controllers/userController";

// ======================================================
// LOAD ENV
// ======================================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ======================================================
// MIDDLEWARE GLOBAL
// ======================================================
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================================
// STATIC FILES (UPLOADS)
// ======================================================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ======================================================
// REGISTER ROUTES
// ======================================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/submissions", projectSubmissionRoutes);
app.use("/api/training", trainingCRUDRoutes);
app.use("/api/training-registrations", trainingRegistrationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/lecturer", lecturerRoutes);

// ======================================================
// ROOT
// ======================================================
app.get("/", (_req, res) => {
  res.json({ message: "API Running" });
});

// ======================================================
// 404 HANDLER
// ======================================================
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ======================================================
// START SERVER + ENSURE SUPERADMIN
// ======================================================
app.listen(PORT, async () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);

  // 🔐 AUTO CREATE SUPERADMIN (AMAN)
  await ensureSuperAdmin();
});
