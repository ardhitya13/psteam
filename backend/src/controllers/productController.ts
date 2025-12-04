import { Request, Response } from "express";
import { prisma } from "../db";
import path from "path";
import fs from "fs";
import { generateProductCode } from "../utils/productUtils";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: true, message: "Gagal mengambil produk" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: true, message: "Gagal mengambil produk" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, category, academicYear, description, link, publishDate } = req.body;

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const code = await generateProductCode(category);

    const newProduct = await prisma.product.create({
      data: {
        title,
        category,
        academicYear,
        description,
        link,
        publishDate: new Date(publishDate + "T00:00:00.000Z"),
        image: imagePath,
        code,
      },
    });

    res.json(newProduct);
  } catch (err) {
    console.error("❌ ERROR CREATE PRODUCT:", err);
    res.status(500).json({ error: true, message: "Gagal membuat produk" });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, category, academicYear, description, link, publishDate } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing)
      return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });

    // FIX: multer.fields -> req.files
    const file = (req.files as any)?.image?.[0];

    let imagePath = existing.image;

    if (file) {
      const oldPath = path.join(__dirname, "../../", existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      imagePath = `/uploads/products/${file.filename}`;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title,
        category,
        academicYear,
        description,
        link,
        publishDate: new Date(publishDate),
        image: imagePath,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("❌ ERROR UPDATE PRODUCT:", err);
    res.status(500).json({ error: true, message: "Gagal update produk" });
  }
};


export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: true, message: "Produk tidak ditemukan" });

    if (existing.image) {
      const oldPath = path.join(__dirname, "../../", existing.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await prisma.product.delete({ where: { id } });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ ERROR DELETE PRODUCT:", err);
    res.status(500).json({ error: true, message: "Gagal menghapus produk" });
  }
};

// ========== FIX PALING PENTING ==========
export const ProductController = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};

