"use client";

import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData: { id: number; title: string; type: string; year: number } | null;
  onSubmit: (data: { id: number; title: string; type: string; year: number }) => void;
}

export default function EditScientificWorkCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: EditProps) {
  const [form, setForm] = useState({
    id: 0,
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData && isOpen) {
      setForm(defaultData);
    }
  }, [defaultData, isOpen]);

  if (!isOpen || !defaultData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {/* CARD PUTIH SAMA PERSIS SEPERTI HKI */}
      <div className="w-[420px] bg-white rounded-2xl shadow-lg p-6 text-gray-800">

        <h2 className="text-xl font-semibold mb-5 text-center">
          Edit Karya Ilmiah
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* JUDUL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Karya Ilmiah
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full text-sm text-black"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* JENIS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Karya
            </label>
            <select
              className="border rounded-lg px-3 py-2 w-full bg-white text-sm text-black"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="">Pilih jenis karya</option>
              <option value="Jurnal Nasional">Jurnal Nasional</option>
              <option value="Jurnal Nasional Terakreditasi">Jurnal Nasional Terakreditasi</option>
              <option value="Jurnal Internasional">Jurnal Internasional</option>
              <option value="Prosiding Nasional">Prosiding Nasional</option>
              <option value="Prosiding Internasional">Prosiding Internasional</option>
              <option value="Buku Ajar">Buku Ajar</option>
            </select>
          </div>

          {/* TAHUN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun
            </label>
            <input
              type="number"
              min={2000}
              max={2100}
              className="border rounded-lg px-3 py-2 w-full text-sm text-black"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              required
            />
          </div>

          {/* TOMBOL */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg text-black"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>
    </ModalWrapper>
  );
}
