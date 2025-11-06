"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "../components/ModalWrapper";

interface EditHkiCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { no: number; judul: string; jenis: string; tahun: number }) => void;
  defaultData: { no: number; judul: string; jenis: string; tahun: number } | null;
}

export default function EditHkiCard({ isOpen, onClose, onSubmit, defaultData }: EditHkiCardProps) {
  const [formData, setFormData] = useState({ no: 0, judul: "", jenis: "", tahun: new Date().getFullYear() });

  useEffect(() => {
    if (defaultData) setFormData(defaultData);
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "tahun" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Edit HKI / Paten</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul HKI</label>
            <input type="text" name="judul" value={formData.judul} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis HKI</label>
            <select name="jenis" value={formData.jenis} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
              <option value="">Pilih Jenis HKI</option>
              <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
              <option value="Paten Sederhana">Paten Sederhana</option>
              <option value="Desain Industri">Desain Industri</option>
              <option value="Merek Dagang">Merek Dagang</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
            <input type="number" name="tahun" value={formData.tahun} onChange={handleChange} required min={2000} max={2100} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">Batal</button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
