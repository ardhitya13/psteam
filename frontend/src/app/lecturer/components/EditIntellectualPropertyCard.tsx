"use client";

import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditHkiProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData: { id: number; title: string; type: string; year: number } | null;
  onSubmit: (data: { id: number; title: string; type: string; year: number }) => void;
}

export default function EditIntellectualPropertyCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: EditHkiProps) {
  const [form, setForm] = useState({
    id: 0,
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData) setForm(defaultData);
  }, [defaultData]);

  if (!isOpen || !defaultData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-5 text-center text-gray-800">
        Edit HKI / Paten
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* JUDUL */}
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Judul HKI
          </label>
          <input
            type="text"
            className="border w-full rounded-lg px-3 py-2 text-sm text-black"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Jenis HKI
          </label>
          <select
            className="border w-full rounded-lg px-3 py-2 text-sm bg-white text-black"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Pilih jenis HKI</option>
            <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
            <option value="Hak Cipta Internasional">Hak Cipta Internasional</option>
          </select>
        </div>

        {/* YEAR */}
        <div>
          <label className="text-sm font-medium mb-1 block text-gray-700">
            Tahun
          </label>
          <input
            type="number"
            className="border w-full rounded-lg px-3 py-2 text-sm text-black"
            min={2000}
            max={2100}
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            required
          />
        </div>

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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Simpan Perubahan
          </button>
        </div>

      </form>
    </ModalWrapper>
  );
}
