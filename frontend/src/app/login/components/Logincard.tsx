"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Logincard() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [idLearning, setIdLearning] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔥 Akun manual
  const accounts = [
    { id: "admin01", pass: "admin123", role: "admin" },
    { id: "dosen01", pass: "dosen123", role: "dosen" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Silakan pilih jenis user!");
      return;
    }

    const found = accounts.find(
      (acc) =>
        acc.id === idLearning &&
        acc.pass === password &&
        acc.role === role
    );

    if (!found) {
      setError("ID Learning, Password, atau Role salah!");
      return;
    }

    // 🔥 Redirect
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "dosen") {
      router.push("/lecturer");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Logo */}
      <img
        src="/logopsteam1.png"
        alt="Logo Polibatam"
        className="w-28 mb-3"
      />

      {/* Title */}
      <h1 className="text-center text-[15px] text-gray-700 font-medium leading-tight mb-6">
        Polibatam Software Team <br /> Politeknik Negeri Batam
      </h1>

      <form onSubmit={handleSubmit} className="w-full">

        {/* 🔥 Role Dropdown */}
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

        {/* ID Learning */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="ID Learning"
            value={idLearning}
            onChange={(e) => setIdLearning(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
