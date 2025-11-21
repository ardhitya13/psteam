import express from "express";
import cors from "cors";
import teamRoutes from "./routes/teamRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // penting untuk BASE64 image
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/team", teamRoutes);

// Root test
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
