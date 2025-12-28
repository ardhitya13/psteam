import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * Middleware:
 * - Admin & Superadmin → bebas
 * - Dosen → hanya boleh akses research miliknya sendiri
 */
export const allowResearchOwnerOrAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const researchId = Number(req.params.id);

    if (!researchId) {
      return res.status(400).json({ error: "Invalid research id" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ ADMIN & SUPERADMIN BEBAS
    if (user.role === "admin" || user.role === "superadmin") {
      return next();
    }

    // 🔎 CARI RESEARCH + OWNER
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

    // 🔥 CEK KEPEMILIKAN
    if (research.lecturer.userId !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // ✅ LOLOS
    next();
  } catch (error) {
    console.error("researchOwnerMiddleware error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
