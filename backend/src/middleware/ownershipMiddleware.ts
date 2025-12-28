import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const allowSelfOrAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const paramUserId = Number(req.params.userId);

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Admin & superadmin bebas
  if (req.user.role === "admin" || req.user.role === "superadmin") {
    return next();
  }

  // Dosen hanya boleh akses data sendiri
  if (req.user.role === "dosen" && req.user.id === paramUserId) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden" });
};
