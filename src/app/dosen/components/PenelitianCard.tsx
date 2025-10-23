"use client";

import { useState } from "react";

interface PenelitianCardProps {
  onClose: () => void; // 👈 tambahkan properti ini
}

export default function PenelitianCard({ onClose }: PenelitianCardProps) {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [dokumen, setDokumen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ judul, tanggal, dokumen });
    alert("Data penelitian berhasil diunggah!");
    onClose(); // 👈 otomatis tutup modal setelah submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4 text-gray-900">
          Unggah Penelitian
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Judul Penelitian"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setDokumen(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Tambahkan
          </button>
        </form>
      </div>
    </div>
  );
}
