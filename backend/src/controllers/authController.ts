import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { AuthRequest } from "../middleware/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET;

/* =========================================================
   REGISTER USER (AUTO CREATE LECTURER PROFILE FOR DOSEN)
   ========================================================= */
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const exist = await prisma.user.findUnique({
      where: { email },
    });

    if (exist) {
      return res.status(400).json({ error: "Email telah digunakan" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
      },
    });

    // Auto Create Lecturer Profile
    if (role === "dosen") {
      await prisma.lecturerprofile.create({
        data: {
          userId: user.id,
          studyProgram: null,
          specialization: null,
        },
      });
    }

    return res.status(201).json({
      message: "User berhasil dibuat",
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

/* =========================================================
   LOGIN
   ========================================================= */
export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET belum diset" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email tidak ditemukan" });
    }

    // Validasi Role
    if (role === "admin") {
      if (user.role !== "admin" && user.role !== "superadmin") {
        return res.status(403).json({ error: "Role tidak sesuai" });
      }
    } else {
      if (user.role !== role) {
        return res.status(403).json({ error: "Role tidak sesuai" });
      }
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

/* =========================================================
   CHANGE PASSWORD
   ========================================================= */
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password lama salah" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};
