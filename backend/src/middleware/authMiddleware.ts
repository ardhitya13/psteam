import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET belum diset" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
    };

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalid" });
  }
};

/* ===============================
   AUTHORIZATION
================================ */
export const allowAdminOrOwner = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userIdParam = Number(req.params.userId);

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role === "admin") return next();

  if (req.user.role === "dosen" && req.user.id === userIdParam) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden" });
};
