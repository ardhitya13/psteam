import { Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "./authMiddleware";

/**
 * Middleware:
 * - Admin / Superadmin bebas
 * - Dosen hanya boleh edit / delete intellectual property miliknya sendiri
 */
export const allowIntellectualPropertyOwnerOrAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ipId = Number(req.params.id);

    if (!ipId) {
      return res
        .status(400)
        .json({ error: "Invalid intellectual property id" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ ADMIN & SUPERADMIN BEBAS
    if (user.role === "admin" || user.role === "superadmin") {
      return next();
    }

    // 🔎 CARI INTELLECTUAL PROPERTY + OWNER
    const intellectualProperty = await prisma.intellectualproperty.findUnique({
      where: { id: ipId },
      select: {
        lecturer: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!intellectualProperty) {
      return res
        .status(404)
        .json({ error: "Intellectual property not found" });
    }

    // 🔥 CEK KEPEMILIKAN
    if (intellectualProperty.lecturer.userId !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("intellectualPropertyOwnerMiddleware error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
