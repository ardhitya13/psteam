import express from "express";
import cors from "cors";
import path from "path";

// Routes
import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRoutes from "./routes/trainingRoutes";
import productRoutes from "./routes/productRoutes";
import submissionRoutes from "./routes/projectSubmissionRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ===============================
// FIX TERPENTING: Serve folder uploads
// ===============================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// ===============================
// API Routes
// ===============================
app.use("/api/team", teamRoutes);
app.use("/api/submissions", projectSubmissionRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/submissions", submissionRoutes);

// ===============================
// Root route
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "API Running on PSTEAM Backend" });
});

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
    path: req.originalUrl,
  });
});



// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
