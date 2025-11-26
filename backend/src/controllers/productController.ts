import { Request, Response } from "express";
import { prisma } from "../db";

export class ProductController {
  // ⭐ Auto-generate kode
  static async generateProductCode(category: string) {
    const prefix = category.toUpperCase();

    const last = await prisma.product.findMany({
      where: { category },
      orderBy: { id: "desc" },
      take: 1,
    });

    let nextNumber = 1;

    if (last.length > 0) {
      const match = last[0].code.match(/\d+$/);
      if (match) nextNumber = parseInt(match[0]) + 1;
    }

    return `PSTEAM-${prefix}${String(nextNumber).padStart(2, "0")}`;
  }

  // GET ALL
  static async getAll(req: Request, res: Response) {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    return res.json(products);
  }

  // GET BY ID
  static async getById(req: Request, res: Response) {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json(product);
  }

  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const { title, category, academicYear, description, link, publishDate } =
        req.body;

      const imagePath = req.file
        ? `/uploads/products/${req.file.filename}`
        : "";

      const code = await ProductController.generateProductCode(category);

      const newProduct = await prisma.product.create({
        data: {
          title,
          category,
          academicYear,
          description,
          link,
          publishDate: new Date(publishDate),
          image: imagePath,
          code,
        },
      });

      return res.json(newProduct); // ⚡ Return langsung
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const existing = await prisma.product.findUnique({ where: { id } });
      if (!existing) return res.status(404).json({ message: "Not found" });

      const {
        title,
        category,
        academicYear,
        description,
        link,
        publishDate,
      } = req.body;

      // ✔ Gunakan file baru atau image lama
      const imagePath = req.file
        ? `/uploads/products/${req.file.filename}`
        : existing.image;

      let code = existing.code;

      // Jika category berubah → generate ulang
      if (existing.category !== category) {
        code = await ProductController.generateProductCode(category);
      }

      const updated = await prisma.product.update({
        where: { id },
        data: {
          image: imagePath,
          title,
          category,
          academicYear,
          description,
          link,
          publishDate: new Date(publishDate),
          code,
        },
      });

      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await prisma.product.delete({ where: { id } });
      return res.json({ message: "Deleted" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
