import express from "express";
import cors from "cors";
import path from "path";

import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRegistrationRoutes from "./routes/trainingRegistrationRoutes";
import trainingCRUDRoutes from "./routes/trainingCRUDRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import lecturerRoutes from "./routes/lecturerRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================
// STATIC UPLOADS (FOLDER BENAR)
// ==========================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ==========================
// REGISTER ROUTES
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/submissions", projectSubmissionRoutes);
app.use("/api/training", trainingCRUDRoutes);
app.use("/api/registrations", trainingRegistrationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/lecturer", lecturerRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
