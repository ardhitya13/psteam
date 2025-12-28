import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const allowResearchOwnerOrAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const researchId = Number(req.params.id);
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Admin bebas akses
    if (user.role === "admin" || user.role === "superadmin") {
      return next();
    }

    const research = await prisma.research.findUnique({
      where: { id: researchId },
      select: {
        lecturer: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }

    // 🔥 CEK OWNER SEBENARNYA
    if (research.lecturer.userId !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
