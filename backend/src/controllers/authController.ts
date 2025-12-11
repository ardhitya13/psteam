import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

// =============================================================
// LOGIN
// =============================================================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, dan role wajib diisi" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email tidak terdaftar" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password salah" });
    }

    // RULE LOGIN:
    if (user.role === "superadmin" && role === "admin") {
      // allowed
    } else if (user.role !== role) {
      return res.status(401).json({ error: "Role tidak sesuai!" });
    }

    return res.json({
      message: "Login sukses",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// =============================================================
// CHANGE PASSWORD
// =============================================================
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Validasi input
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // Ambil user
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Cek password lama
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: "Password lama salah" });
    }

    // Hash password baru
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: hashed },
    });

    return res.json({ message: "Password berhasil diperbarui!" });

  } catch (err: any) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
