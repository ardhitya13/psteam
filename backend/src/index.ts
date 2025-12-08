import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import teamRoutes from "./routes/teamRoutes";
import projectSubmissionRoutes from "./routes/projectSubmissionRoutes";
import trainingRegistrationRoutes from "./routes/trainingRegistrationRoutes"; // routes pendaftaran pelatihan
import trainingCRUDRoutes from "./routes/trainingCRUDRoutes"; // routes pembuatan pelatihan baru
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";



const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================
app.use("/api/auth", authRoutes); // routes login user
app.use("/api/users", userRoutes); // routes user
app.use("/api/team", teamRoutes); // routes team
app.use("/api/submissions", projectSubmissionRoutes); // routes project
app.use("/api/training", trainingCRUDRoutes); // routes pembuatan pelatihan
app.use("/api/registrations", trainingRegistrationRoutes); // routes pendaftaran pelatihan
app.use("/api/products", productRoutes); // routes product

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
