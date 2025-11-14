"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function EditTeamModal({ data, onClose, onUpdate }: any) {
  const [form, setForm] = useState({ ...data });

  const handleChange = (field: string, value: string) => {
    setForm((p: any) => ({ ...p, [field]: value }));
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0a3b91] mb-5 text-center">
            Edit Anggota Tim
          </h2>

          {/* IMAGE SECTION */}
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

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NAMA */}
            <div>
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <input
                className={inputClass}
                value={form.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className={inputClass}
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* ROLE (DISABLED) */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Peran (Tidak Dapat Diubah)
              </label>
              <input className={inputClass} value={form.role || ""} disabled />
            </div>

            {/* IF DOSEN → DOSEN INFO */}
            {form.category === "dosen" && (
              <>
                {/* STUDY PROGRAM */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Program Studi
                  </label>
                  <input
                    className={inputClass}
                    value={form.studyProgram || ""}
                    onChange={(e) =>
                      handleChange("studyProgram", e.target.value)
                    }
                    placeholder="Contoh: Teknik Informatika"
                  />
                </div>

                {/* EDUCATION */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Pendidikan
                  </label>
                  <input
                    className={inputClass}
                    value={form.education || ""}
                    onChange={(e) => handleChange("education", e.target.value)}
                    placeholder="Contoh: Magister (S2)"
                  />
                </div>

                {/* SPECIALIZATION */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Spesialisasi
                  </label>
                  <input
                    className={inputClass}
                    value={form.specialization || ""}
                    onChange={(e) =>
                      handleChange("specialization", e.target.value)
                    }
                    placeholder="Contoh: Software Development"
                  />
                </div>
              </>
            )}

            {/* CATEGORY (DISABLED) */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                disabled
              >
                <option value="dosen">Dosen</option>
                <option value="mahasiswa">Mahasiswa</option>
              </select>
            </div>

            {/* WEBSITE */}
            <div>
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input
                className={inputClass}
                value={form.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            {/* GITHUB */}
            <div>
              <label className="text-sm font-medium text-gray-700">GitHub</label>
              <input
                className={inputClass}
                value={form.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            {/* LINKEDIN */}
            <div>
              <label className="text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                className={inputClass}
                value={form.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            {/* FACEBOOK */}
            <div>
              <label className="text-sm font-medium text-gray-700">Facebook</label>
              <input
                className={inputClass}
                value={form.facebook || ""}
                onChange={(e) => handleChange("facebook", e.target.value)}
                placeholder="https://facebook.com/username"
              />
            </div>

            {/* INSTAGRAM */}
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

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
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
    </div>
  );
}
