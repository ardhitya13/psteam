"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function EditTeamModal({ data, onClose, onUpdate }: any) {
  const [form, setForm] = useState({ ...data });

  const handleChange = (field: string, value: string) => {
    setForm((p: any) => ({ ...p, [field]: value }));
  };

  // === Handle upload foto dari device (ubah ke base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((p: any) => ({ ...p, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const inputClass =
    "w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none text-gray-800 placeholder-gray-400 bg-white";

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Nama tidak boleh kosong!");
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start md:items-center z-50 overflow-auto py-10">
      <div className="bg-white w-[95%] md:w-[90%] max-w-3xl rounded-xl shadow-xl p-6 relative border border-gray-200">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#0a3b91] mb-5 text-center">
          Edit Anggota Tim
        </h2>

        {/* === Preview Foto + Upload === */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-xs">No Image</span>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload Foto Profil
            </label>
            <input
              type="file"
              accept="image/*"
              className="block mt-1 text-sm text-gray-600"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* === Form Data === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nama</label>
            <input
              className={inputClass}
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className={inputClass}
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Peran</label>
            <input
              className={inputClass}
              value={form.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="dosen">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
          </div>

          {/* Sosial Media */}
          <div>
            <label className="text-sm font-medium text-gray-700">Website</label>
            <input
              className={inputClass}
              value={form.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">GitHub</label>
            <input
              className={inputClass}
              value={form.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              className={inputClass}
              value={form.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Facebook</label>
            <input
              className={inputClass}
              value={form.facebook || ""}
              onChange={(e) => handleChange("facebook", e.target.value)}
              placeholder="https://facebook.com/username"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Instagram</label>
            <input
              className={inputClass}
              value={form.instagram || ""}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>

        {/* === Tombol Aksi === */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
