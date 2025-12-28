import { Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "./authMiddleware";

/**
 * Middleware:
 * - Admin / Superadmin bebas
 * - Dosen hanya boleh edit / delete scientific work miliknya sendiri
 */
export const allowScientificWorkOwnerOrAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const workId = Number(req.params.id);

    if (!workId) {
      return res.status(400).json({ error: "Invalid scientific work id" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ ADMIN & SUPERADMIN BEBAS
    if (user.role === "admin" || user.role === "superadmin") {
      return next();
    }

    // 🔎 CARI SCIENTIFIC WORK + OWNER
    const scientificWork = await prisma.scientificwork.findUnique({
      where: { id: workId },
      select: {
        lecturer: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!scientificWork) {
      return res.status(404).json({ error: "Scientific work not found" });
    }

    // 🔥 CEK KEPEMILIKAN
    if (scientificWork.lecturer.userId !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("scientificWorkOwnerMiddleware error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
