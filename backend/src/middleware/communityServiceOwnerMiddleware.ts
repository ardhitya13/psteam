import { Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "./authMiddleware";

/**
 * Middleware:
 * - Admin / Superadmin bebas
 * - Dosen hanya boleh edit / delete community service miliknya sendiri
 */
export const allowCommunityServiceOwnerOrAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const serviceId = Number(req.params.id);

    if (!serviceId) {
      return res.status(400).json({ error: "Invalid community service id" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ ADMIN & SUPERADMIN BEBAS
    if (user.role === "admin" || user.role === "superadmin") {
      return next();
    }

    // 🔎 CARI COMMUNITY SERVICE + OWNER
    const communityService = await prisma.communityservice.findUnique({
      where: { id: serviceId },
      select: {
        lecturer: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!communityService) {
      return res.status(404).json({ error: "Community service not found" });
    }

    // 🔥 CEK KEPEMILIKAN
    if (communityService.lecturer.userId !== user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("communityServiceOwnerMiddleware error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
