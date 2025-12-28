import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import * as ProductController from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

/* =========================
   UPLOAD CONFIG
========================= */
const dir = path.join(__dirname, "../../uploads/products");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: dir,
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   PUBLIC ROUTES
========================= */

// 🔓 LIHAT SEMUA PRODUK
router.get("/", ProductController.getAll);

// 🔓 LIHAT DETAIL PRODUK
router.get("/:id", ProductController.getById);

/* =========================
   PROTECTED ROUTES (JWT)
========================= */

// 🔐 CREATE PRODUCT (ADMIN)
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  upload.single("image"),
  ProductController.create
);

// 🔐 UPDATE PRODUCT (ADMIN)
router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  ProductController.update
);

// 🔐 DELETE PRODUCT (ADMIN)
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  ProductController.remove
);

export default router;
