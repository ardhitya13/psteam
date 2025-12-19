"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { createPortal } from "react-dom";

interface AddResearchCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; year: number }) => void;
}

export default function AddResearchCard({ isOpen, onClose, onSubmit }: AddResearchCardProps) {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = formData.title.trim();
    if (!trimmed) return alert("Judul tidak boleh kosong.");
    if (formData.year < 2000 || formData.year > 2100)
      return alert("Tahun tidak valid.");

    onSubmit({ title: trimmed, year: formData.year });

    setSuccessTitle(trimmed);
    setSuccessAlert(true);
  };

  function SuccessAlert() {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
        <div className="bg-white p-6 rounded-lg text-center w-80 text-black">
          <h3 className="text-blue-600 font-bold mb-2">Berhasil!</h3>
          <p className="mb-4">Penelitian "{successTitle}" berhasil ditambahkan.</p>
          <button
            onClick={() => {
              setSuccessAlert(false);
              setFormData({ title: "", year: new Date().getFullYear() });
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[95%] max-w-md text-black">

        <h2 className="text-lg font-semibold text-center mb-4">
          Tambah Penelitian
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium text-sm">Judul</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="font-medium text-sm">Tahun</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              min={2000}
              max={2100}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Simpan
            </button>
          </div>

        </form>

        {successAlert && <SuccessAlert />}
      </div>
    </ModalWrapper>
  );
}
