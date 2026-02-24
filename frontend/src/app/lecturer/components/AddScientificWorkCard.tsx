"use client";

import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; type: string; year: number }) => void;
}

export default function AddScientificWorkCard({
  isOpen,
  onClose,
  onSubmit,
}: AddProps) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", type: "", year: new Date().getFullYear() });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      
      <h2 className="text-xl font-semibold mb-5 text-center text-gray-800">
        Tambah Karya Ilmiah
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">

        {/* JUDUL */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            className="border w-full rounded-lg px-3 py-2 text-sm text-black"
            placeholder="Masukkan Judul"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Jenis Karya
          </label>
          <select
            className="border w-full rounded-lg px-3 py-2 text-sm bg-white text-black"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Pilih jenis karya</option>
            <option value="Jurnal Nasional">Jurnal Nasional</option>
            <option value="Jurnal Nasional Terakreditasi">
              Jurnal Nasional Terakreditasi
            </option>
            <option value="Jurnal Internasional">Jurnal Internasional</option>
            <option value="Prosiding Nasional">Prosiding Nasional</option>
            <option value="Prosiding Internasional">
              Prosiding Internasional
            </option>
            <option value="Lain-Lain">Lain-Lain</option>
          </select>
        </div>

        {/* YEAR */}
        <div>
          <label className="block text-sm font-medium mb-1">Tahun</label>
          <input
            type="number"
            className="border w-full rounded-lg px-3 py-2 text-sm text-black"
            value={form.year}
            min={2000}
            max={2100}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg text-black"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>

      </form>

    </ModalWrapper>
  );
}
