import { Router } from "express";
import prisma from "../lib/prisma"; // ⬅️ PATH INI PENTING

const router = Router();

/**
 * PUBLIC LECTURER PORTFOLIO
 * NO AUTH
 */
router.get("/lecturer", async (_req, res) => {
  try {
    const lecturers = await prisma.user.findMany({
      where: { role: "dosen" },
      select: {
        name: true,
        email: true,
        lecturerprofile: {
          select: {
            studyProgram: true,
            specialization: true,
            imageUrl: true,
            educationhistory: true,
            research: true,
            communityservice: true,
            scientificwork: true,
            intellectualproperty: true,
          },
        },
      },
    });

    res.json(lecturers);
  } catch (error) {
    console.error("PUBLIC LECTURER ERROR:", error);
    res.status(500).json({
      error: true,
      message: "Failed to load lecturer portfolio",
    });
  }
});

export default router;
