"use client";

import { useState } from "react";
import NavbarLecturer from "../components/NavbarLecturer";
import SidebarLecturer from "../components/SidebarLecturer";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirm) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (newPassword !== confirm) {
      alert("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ JWT
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengganti password");
      }

      alert("Password berhasil diperbarui!");
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <NavbarLecturer toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarLecturer
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 pt-6 px-8 pb-10 ${
          isSidebarOpen ? "ml-[232px]" : "ml-[80px]"
        } mt-[85px]`}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg p-8 border max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <KeyRound size={32} className="text-[#0a3b91]" />
            <h1 className="text-2xl font-bold text-[#0a3b91]">
              Ganti Password
            </h1>
          </div>

          <input
            type="password"
            placeholder="Password Lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full mb-4 border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password Baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-4 border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Konfirmasi Password Baru"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full mb-6 border rounded-xl px-4 py-3"
          />

          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full bg-[#0a3b91] text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Memproses..." : "Update Password"}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
