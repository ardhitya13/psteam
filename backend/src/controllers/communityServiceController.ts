import { Request, Response } from "express";
import { prisma } from "../db";

/* =========================================================
   GET ALL COMMUNITY SERVICE BY LECTURER
   ========================================================= */
export const getCommunityService = async (req: Request, res: Response) => {
  try {
    const lecturerId = Number(req.params.lecturerId);

    if (!lecturerId) {
      return res.status(400).json({ error: "lecturerId tidak valid" });
    }

    const services = await prisma.communityservice.findMany({
      where: { lecturerId },
      orderBy: { year: "desc" },
    });

    res.json(services);
  } catch (error) {
    console.error("GET COMMUNITY SERVICE ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

/* =========================================================
   CREATE COMMUNITY SERVICE
   ========================================================= */
export const createCommunityService = async (req: Request, res: Response) => {
  try {
    const lecturerId = Number(req.params.lecturerId);
    const { title, year } = req.body;

    if (!title || !year) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const newService = await prisma.communityservice.create({
      data: {
        title,
        year: Number(year),
        lecturerId,
      },
    });

    res.status(201).json(newService);
  } catch (error) {
    console.error("CREATE COMMUNITY SERVICE ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

/* =========================================================
   UPDATE COMMUNITY SERVICE
   ========================================================= */
export const updateCommunityService = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, year } = req.body;

    const updated = await prisma.communityservice.update({
      where: { id },
      data: { title, year: Number(year) },
    });

    res.json(updated);
  } catch (error) {
    console.error("UPDATE COMMUNITY SERVICE ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

/* =========================================================
   DELETE COMMUNITY SERVICE
   ========================================================= */
export const deleteCommunityService = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.communityservice.delete({
      where: { id },
    });

    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error("DELETE COMMUNITY SERVICE ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};
