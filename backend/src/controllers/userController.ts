import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

/* =========================================================
   AUTO CREATE SUPERADMIN (DIPANGGIL SAAT SERVER START)
   ========================================================= */
export const ensureSuperAdmin = async () => {
  try {
    const existing = await prisma.user.findUnique({
      where: { email: "superadmin@psteam.com" },
    });

    if (existing) {
      console.log("✅ Superadmin sudah ada");
      return;
    }

    const hashed = await bcrypt.hash("SuperAdmin12", 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "superadmin@psteam.com",
        password: hashed,
        role: "superadmin",
      },
    });

    console.log("🔥 SUPERADMIN BERHASIL DIBUAT");
    console.log("📧 Email    : superadmin@psteam.com");
    console.log("🔑 Password : SuperAdmin12");
  } catch (error) {
    console.error("❌ Gagal membuat superadmin:", error);
  }
};

/* =========================================================
   GET ALL USERS (ROLE-BASED)
   ========================================================= */
export const getUsers = async (req: any, res: Response) => {
  try {
    const requesterRole = req.user.role;

    let whereClause: any = {};

    // ADMIN → tidak boleh lihat superadmin
    if (requesterRole === "admin") {
      whereClause = { NOT: { role: "superadmin" } };
    }

    // SUPERADMIN → lihat semua
    if (requesterRole === "superadmin") {
      whereClause = {};
    }

    // selain admin/superadmin ditolak
    if (!["admin", "superadmin"].includes(requesterRole)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      orderBy: { id: "desc" },
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================================================
   CREATE SINGLE USER (ROLE-BASED)
   ========================================================= */
export const createUser = async (req: any, res: Response) => {
  try {
    const requesterRole = req.user.role;
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    // ❌ Superadmin tidak boleh dibuat via API
    if (role === "superadmin") {
      return res
        .status(403)
        .json({ error: "Superadmin tidak boleh dibuat via API" });
    }

    // ADMIN → hanya boleh tambah DOSEN
    if (requesterRole === "admin" && role !== "dosen") {
      return res
        .status(403)
        .json({ error: "Admin hanya boleh menambah dosen" });
    }

    // SUPERADMIN → boleh tambah admin & dosen
    if (
      requesterRole === "superadmin" &&
      !["admin", "dosen"].includes(role)
    ) {
      return res.status(403).json({ error: "Role tidak valid" });
    }

    if (!["admin", "superadmin"].includes(requesterRole)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
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

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================================================
   BULK CREATE USERS (OPTIONAL, TETAP DIKUNCI)
   ========================================================= */
export const createManyUsers = async (req: any, res: Response) => {
  try {
    const requesterRole = req.user.role;

    if (!["admin", "superadmin"].includes(requesterRole)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const users = req.body as {
      name: string;
      email: string;
      password: string;
      role: string;
    }[];

    const data = await Promise.all(
      users.map(async (u) => {
        if (u.role === "superadmin") {
          throw new Error("Superadmin tidak boleh dibuat via bulk");
        }

        if (requesterRole === "admin" && u.role !== "dosen") {
          throw new Error("Admin hanya boleh menambah dosen");
        }

        return {
          name: u.name,
          email: u.email,
          password: await bcrypt.hash(u.password, 10),
          role: u.role,
        };
      })
    );

    const created = await prisma.user.createMany({
      data,
      skipDuplicates: true,
    });

    res.json({
      message: "Bulk users created",
      count: created.count,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/* =========================================================
   DELETE USER (ROLE-BASED)
   ========================================================= */
export const deleteUser = async (req: any, res: Response) => {
  try {
    const requesterRole = req.user.role;
    const requesterId = req.user.id;
    const id = Number(req.params.id);

    // ❌ TIDAK BOLEH HAPUS DIRI SENDIRI (TERMASUK SUPERADMIN)
    if (requesterId === id) {
      return res.status(403).json({
        error: "Anda tidak dapat menghapus akun Anda sendiri",
      });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // ❌ SUPERADMIN TIDAK BOLEH DIHAPUS OLEH SIAPAPUN
    if (user.role === "superadmin") {
      return res.status(403).json({
        error: "Superadmin tidak boleh dihapus",
      });
    }

    // ADMIN → hanya boleh hapus DOSEN
    if (requesterRole === "admin" && user.role !== "dosen") {
      return res.status(403).json({
        error: "Admin hanya boleh menghapus dosen",
      });
    }

    // Validasi role peminta
    if (!["admin", "superadmin"].includes(requesterRole)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    await prisma.user.delete({ where: { id } });

    return res.json({ message: "User berhasil dihapus" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

