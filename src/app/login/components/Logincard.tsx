"use client";
import React, { useState } from "react";

export default function Logincard() {
  const [idLearning, setIdLearning] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", idLearning, password);
    // nanti bisa sambung ke API login
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-3">
          <input
            type="text"
            placeholder="ID Learning"
            value={idLearning}
            onChange={(e) => setIdLearning(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        <p className="text-red-600 text-sm mb-3">
          Masuk dengan akun Learning!
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm"
        >
          Masuk
        </button>
      </form>

      <button className="text-blue-600 text-sm mt-3 hover:underline">
        Lupa Sandi
      </button>
    </div>
  );
}
