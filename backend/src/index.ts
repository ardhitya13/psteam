import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRoutes from "./routes/trainingRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// =============================================================
// FIX FINAL: Path upload HARUS dari root backend (bukan __dirname)
// =============================================================
const rootPath = process.cwd();         // <--- SELALU benar
const uploadsPath = path.join(rootPath, "uploads");
const productUploads = path.join(uploadsPath, "products");

// Buat folder jika belum ada
if (!fs.existsSync(productUploads)) {
  fs.mkdirSync(productUploads, { recursive: true });
}

console.log("📁 Uploads path:", uploadsPath);
console.log("📁 Products folder:", productUploads);

// =============================================================
// STATIC SERVE
// =============================================================
app.use("/uploads", express.static(uploadsPath));

console.log(`📦 Static URL: http://localhost:${PORT}/uploads`);

// =============================================================
app.use("/api/team", teamRoutes);
app.use("/api/submissions", projectSubmissionRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/products", productRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
