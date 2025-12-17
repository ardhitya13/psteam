"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditScientificWorkCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { no: number; title: string; type: string; year: number }) => void;
  defaultData: { no: number; title: string; type: string; year: number } | null;
}

export default function EditScientificWorkCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditScientificWorkCardProps) {
  
  const [formData, setFormData] = useState({
    no: 0,
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    }
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">Edit Karya Ilmiah</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Judul Karya</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Jenis Karya</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
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

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Tahun</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Simpan Perubahan
          </button>
        </div>

      </form>
    </ModalWrapper>
  );
}
