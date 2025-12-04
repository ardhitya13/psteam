import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import * as ProductController from "../controllers/productController";

const router = Router();

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

router.post("/", upload.single("image"), ProductController.create);
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }]), ProductController.update);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.delete("/:id", ProductController.remove);

export default router;
