"use client";

import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddHkiProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; type: string; year: number }) => void;
}

export default function AddIntellectualPropertyCard({
  isOpen,
  onClose,
  onSubmit,
}: AddHkiProps) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: "",
        type: "",
        year: new Date().getFullYear(),
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Judul wajib diisi!");
    if (!form.type.trim()) return alert("Jenis wajib dipilih!");

    onSubmit(form);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow-md w-[420px] p-6">
        <h2 className="text-xl font-semibold mb-5 text-center text-gray-800">
          Tambah HKI / Paten
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE INPUT */}
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Judul HKI
            </label>
            <input
              type="text"
              placeholder="Masukkan Judul"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border w-full rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          {/* TYPE SELECT */}
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Jenis HKI
            </label>
            <select
              className="border w-full rounded-lg px-3 py-2 text-sm bg-white"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="">Pilih jenis HKI</option>
              <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
              <option value="Hak Cipta Internasional">Hak Cipta Internasional</option>
              <option value="Desain Industri">Desain Industri</option>
              <option value="Paten Sederhana">Paten Sederhana</option>
              <option value="Paten">Paten</option>
            </select>
          </div>

          {/* YEAR INPUT */}
          <div>
            <label className="text-sm font-medium mb-1 block text-gray-700">
              Tahun
            </label>
            <input
              type="number"
              min={2000}
              max={2100}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              className="border w-full rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Tambahkan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
