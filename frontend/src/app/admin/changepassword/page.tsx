"use client";

import { useState } from "react";
import LayoutAdmin from "../LayoutAdmin";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Semua field wajib diisi!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Password baru dan konfirmasi tidak cocok!");
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
        setMessage(data.error || "Gagal mengganti password");
        return;
      }

      setMessage("Password berhasil diubah!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Server tidak merespons");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAdmin>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-8 py-10">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl border border-gray-200">
          <h1 className="text-2xl font-semibold mb-10 text-gray-800 text-center">
            Change Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Old Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E40AF] text-white py-3 rounded-md"
            >
              {loading ? "Menyimpan..." : "Save Changes"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-8 text-center text-sm font-medium ${
                message.includes("berhasil")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
}
