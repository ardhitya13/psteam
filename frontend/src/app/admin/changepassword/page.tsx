"use client";

import { useState } from "react";
import LayoutAdmin from "../LayoutAdmin";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorOld, setErrorOld] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // RESET ERROR
    setErrorOld("");
    setErrorNew("");
    setErrorConfirm("");

    /* =========================
       VALIDASI FRONTEND
    ========================= */
    if (!oldPassword) setErrorOld("Password lama wajib diisi");
    if (!newPassword) setErrorNew("Password baru wajib diisi");
    if (!confirmPassword)
      setErrorConfirm("Konfirmasi password wajib diisi");

    if (!oldPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      setErrorConfirm("Konfirmasi password tidak cocok");
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await res.json();

      /* =========================
         ERROR DARI DATABASE
      ========================= */
      if (!res.ok) {
        if (
          data?.error?.toLowerCase().includes("password lama")
        ) {
          setErrorOld("Password lama salah. Silakan periksa kembali.");
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah password",
            text: data?.error || "Terjadi kesalahan.",
            confirmButtonColor: "#dc2626",
          });
        }
        return;
      }

      /* =========================
         SUCCESS
      ========================= */
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Password berhasil diubah.",
        timer: 1500,
        showConfirmButton: false,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Server tidak merespons",
        text: "Silakan coba lagi.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-white text-gray-900 rounded-md px-4 py-3 text-sm border focus:outline-none focus:ring-2";

  return (
    <LayoutAdmin>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
        <div className="bg-white w-full max-w-xl rounded-xl shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Ganti Kata Sandi
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PASSWORD LAMA */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Password Lama
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`${inputBase} ${
                    errorOld
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errorOld && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} /> {errorOld}
                </p>
              )}
            </div>

            {/* PASSWORD BARU */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`${inputBase} ${
                    errorNew
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errorNew && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} /> {errorNew}
                </p>
              )}
            </div>

            {/* KONFIRMASI */}
            <div>
              <label className="block text-sm text-black font-medium mb-2">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputBase} ${
                    errorConfirm
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-600"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errorConfirm && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} /> {errorConfirm}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60
                         text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}
