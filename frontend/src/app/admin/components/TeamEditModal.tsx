// src/app/admin/components/TeamEditModal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  data: any;
  onClose: () => void;
  onUpdate: (payload: any) => Promise<any>;
};

export default function EditTeamModal({ data, onClose, onUpdate }: Props) {
  const [form, setForm] = useState({ ...data });
  const [loading, setLoading] = useState(false);

  // ALERT POPUP
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev: any) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setAlert(null);

    if (!form.name || !form.name.trim()) {
      setAlert({ type: "error", text: "Nama tidak boleh kosong." });
      return;
    }

    let imageValue = form.image;
    if (typeof imageValue === "string" && imageValue.startsWith("http")) {
      try {
        const url = new URL(imageValue);
        imageValue = url.pathname;
      } catch {}
    }

    const sanitized: any = {
      name: form.name.trim(),
      email: form.email?.trim() || data.email || "",
      github: form.github?.trim() || null,
      linkedin: form.linkedin?.trim() || null,
      facebook: form.facebook?.trim() || null,
      instagram: form.instagram?.trim() || null,
      website: form.website?.trim() || null,
      studyProgram: form.studyProgram?.trim() || null,
      education: form.education?.trim() || null,
      specialization: form.specialization?.trim() || null,
      image: imageValue || null,
    };

    delete sanitized.id;
    delete sanitized.role;
    delete sanitized.category;
    delete sanitized.projectId;

    setLoading(true);
    try {
      await onUpdate({ id: data.id, ...sanitized });

      setAlert({
        type: "success",
        text: "Data anggota berhasil diperbarui!",
      });

      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 700);
    } catch (err: any) {
      console.error("Edit error:", err);
      setAlert({
        type: "error",
        text: `Gagal menyimpan: ${err?.message || "Error tidak diketahui"}`,
      });
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none text-gray-800 placeholder-gray-400 bg-white";

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

          {/* ---------- INLINE MESSAGE (HILANG KALO PAKAI POPUP) ---------- */}
          {/* message popup dipindah ke bawah */}

          {/* FOTO */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
              {form.image ? (
                <img src={form.image} className="object-cover w-full h-full" />
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
            <div>
              <label className="text-sm font-medium text-gray-700">Nama *</label>
              <input
                className={inputClass}
                value={form.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className={inputClass}
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Peran (Tidak dapat diubah)
              </label>
              <input className={inputClass} value={form.role} disabled />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select className={inputClass} value={form.category} disabled>
                <option value="dosen">Dosen</option>
                <option value="mahasiswa">Mahasiswa</option>
              </select>
            </div>

            {form.category === "dosen" && (
              <>
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
                    placeholder="Teknik Informatika"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Pendidikan
                  </label>
                  <input
                    className={inputClass}
                    value={form.education || ""}
                    onChange={(e) =>
                      handleChange("education", e.target.value)
                    }
                    placeholder="Magister (S2)"
                  />
                </div>

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
                    placeholder="Software Development"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input
                className={inputClass}
                value={form.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">GitHub</label>
              <input
                className={inputClass}
                value={form.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                className={inputClass}
                value={form.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Facebook</label>
              <input
                className={inputClass}
                value={form.facebook || ""}
                onChange={(e) => handleChange("facebook", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Instagram</label>
              <input
                className={inputClass}
                value={form.instagram || ""}
                onChange={(e) => handleChange("instagram", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
            >
              Batal
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>

      {/* POPUP ALERT */}
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999] p-4">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 text-center">
            <h3
              className={`text-lg font-semibold mb-3 ${
                alert.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {alert.type === "success" ? "Berhasil!" : "Gagal!"}
            </h3>

            <p className="text-sm text-gray-700 mb-6">{alert.text}</p>

            <button
              onClick={() => {
                if (alert.type === "success") onClose();
                setAlert(null);
              }}
              className={`px-4 py-2 rounded text-white text-sm ${
                alert.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
