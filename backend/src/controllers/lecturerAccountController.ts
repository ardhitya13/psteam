import { Request, Response } from "express";
import { prisma } from "../db";
import crypto from "crypto";

// ===============================
// UTILS: HASH PASSWORD
// ===============================
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return `${salt}:${hash}`;
}

// ===============================
// UTILS: VERIFY PASSWORD (untuk login nanti)
// ===============================
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, originalHash] = stored.split(":");

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === originalHash;
}

// ===============================
// CREATE ACCOUNT
// ===============================
export const createLecturerAccount = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    // Hash password aman
    const hashedPassword = hashPassword(password);

    const account = await prisma.lectureraccount.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    return res.status(201).json(account);
  } catch (err) {
    console.error("createLecturerAccount error:", err);
    return res.status(500).json({ error: "Failed to create account" });
  }
};

// ===============================
// GET ALL ACCOUNTS
// ===============================
export const getLecturerAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.lectureraccount.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(accounts);
  } catch (err) {
    console.error("getLecturerAccounts error:", err);
    return res.status(500).json({ error: "Failed to fetch accounts" });
  }
};

// ===============================
// DELETE ACCOUNT
// ===============================
export const deleteLecturerAccount = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await prisma.lectureraccount.delete({
      where: { id },
    });

    return res.json({ message: "Account deleted", data: deleted });
  } catch (err) {
    console.error("deleteLecturerAccount error:", err);
    return res.status(500).json({ error: "Failed to delete account" });
  }
};
