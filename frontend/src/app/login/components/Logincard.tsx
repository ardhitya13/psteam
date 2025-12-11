"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Logincard() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (loading) return;
    setLoading(true);

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Login gagal");
      setLoading(false);
      return;
    }

    const data = await res.json();

    // ============================
    // ✅ SIMPAN DATA USER SECARA BENAR
    // ============================
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      })
    );

    alert("Login berhasil!");

    // Redirect sesuai role
    if (data.user.role === "superadmin" || data.user.role === "admin") {
      window.location.href = "/admin";
      return;
    }

    if (data.user.role === "dosen") {
      window.location.href = "/lecturer/profil";
      return;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
      <img src="/logopsteam1.png" alt="Logo Polibatam" className="w-28 mb-3" />

      {/* Title */}
      <h1 className="text-center text-[15px] text-gray-700 font-medium leading-tight mb-6">
        Polibatam Software Team <br /> Politeknik Negeri Batam
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
        {/* ROLE */}
        <div className="mb-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Pilih Jenis User</option>
            <option value="admin">Admin</option>
            <option value="dosen">Dosen</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute top-2 right-3 text-gray-600"
          >
            {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
