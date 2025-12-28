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

  /* ================= RESET SAAT MODAL DIBUKA ================= */
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

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Judul HKI wajib diisi!");
      return;
    }

    if (!form.type.trim()) {
      alert("Jenis HKI wajib dipilih!");
      return;
    }

    if (form.year < 2000 || form.year > 2100) {
      alert("Tahun tidak valid!");
      return;
    }

    // ⬅️ KIRIM KE PAGE (PAGE YANG HANDLE API + SWAL)
    onSubmit({
      title: form.title.trim(),
      type: form.type,
      year: form.year,
    });

    // ⬅️ TUTUP MODAL SETELAH SUBMIT
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow-md w-[420px] p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-5 text-center">
          Tambah HKI / Paten
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ================= JUDUL ================= */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Judul HKI
            </label>
            <input
              type="text"
              placeholder="Masukkan judul HKI"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="
                w-full border rounded-lg px-3 py-2 text-sm
                bg-white text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              required
            />
          </div>

          {/* ================= JENIS ================= */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Jenis HKI
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="
                w-full border rounded-lg px-3 py-2 text-sm
                bg-white text-black
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              required
            >
              <option value="">Pilih jenis HKI</option>
              <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
              <option value="Hak Cipta Internasional">
                Hak Cipta Internasional
              </option>
              <option value="Desain Industri">Desain Industri</option>
              <option value="Paten Sederhana">Paten Sederhana</option>
              <option value="Paten">Paten</option>
              <option value="Merek">Merek</option>
              <option value="Rahasia Dagang">Rahasia Dagang</option>
              <option value="Lain-Lain">Lain-Lain</option>
            </select>
          </div>

          {/* ================= TAHUN ================= */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tahun
            </label>
            <input
              type="number"
              min={2000}
              max={2100}
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
              className="
                w-full border rounded-lg px-3 py-2 text-sm
                bg-white text-black
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              required
            />
          </div>

          {/* ================= BUTTON ================= */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 rounded-lg
                bg-gray-200 text-gray-700
                hover:bg-gray-300
              "
            >
              Batal
            </button>

            <button
              type="submit"
              className="
                px-4 py-2 rounded-lg
                bg-blue-600 text-white
                hover:bg-blue-700
              "
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
