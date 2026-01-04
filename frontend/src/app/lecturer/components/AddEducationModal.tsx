"use client";

import { useState, useEffect } from "react";

type Props = { isOpen: boolean; onClose: () => void; onSubmit: (data: any) => void; };

export default function AddEducationModal({ isOpen, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({ degree: "", university: "", major: "" });

  useEffect(() => {
    if (isOpen) setForm({ degree: "", university: "", major: "" });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.degree || !form.university || !form.major)
      return alert("Semua field wajib diisi!");
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-3xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#0a3b91] text-white px-8 py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tambah Riwayat Pendidikan</h2>
          <button onClick={onClose} className="text-3xl font-bold hover:text-gray-200">×</button>
        </div>

        {/* BODY */}
        <div className="px-8 py-6 space-y-6 text-black">

          {/* Degree */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Jenjang Pendidikan</label>
            <select
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#0a3b91]"
            >
              <option value="">-- Pilih Jenjang --</option>
              <option value="Diploma (D3)">Diploma (D3)</option>
              <option value="Sarjana Terapan (D4)">Diploma (D4)</option>
              <option value="Sarjana (S1)">Sarjana (S1)</option>
              <option value="Magister (S2)">Magister (S2)</option>
              <option value="Doktor (S3)">Doktor (S3)</option>
            </select>
          </div>

          {/* University */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Universitas</label>
            <input
              value={form.university}
              onChange={(e) => setForm({ ...form, university: e.target.value })}
              className="border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#0a3b91]"
            />
          </div>

          {/* Major */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Jurusan</label>
            <input
              value={form.major}
              onChange={(e) => setForm({ ...form, major: e.target.value })}
              className="border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#0a3b91]"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end px-8 py-5 bg-gray-50 border-t gap-4">
          <button onClick={onClose} className="px-8 py-3 rounded-xl border text-gray-700 hover:bg-gray-100">Batal</button>
          <button onClick={handleSubmit} className="px-8 py-3 bg-[#0a3b91] text-white rounded-xl hover:bg-blue-800">Tambah</button>
        </div>

      </div>
    </div>
  );
}
