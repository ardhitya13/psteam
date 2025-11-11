"use client";

import { useState } from "react";
import { X, PlusCircle, Trash } from "lucide-react";

type Row = {
  name: string;
  role: string;
  email: string;
  image?: string; // Base64 dari file upload
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  category: "dosen" | "mahasiswa";
};

export default function AddTeamModal({ onClose, onAdd }: any) {
  const [teamTitle, setTeamTitle] = useState<string>("");
  const [dosen, setDosen] = useState<Row[]>([
    {
      name: "",
      role: "Dosen Pembimbing",
      email: "",
      image: "",
      github: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      website: "",
      category: "dosen",
    },
  ]);
  const [mahasiswa, setMahasiswa] = useState<Row[]>([
    {
      name: "",
      role: "Anggota Tim Produksi PSTeam",
      email: "",
      image: "",
      github: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      website: "",
      category: "mahasiswa",
    },
  ]);

  const handleChange = (
    index: number,
    type: "dosen" | "mahasiswa",
    field: string,
    value: string
  ) => {
    if (type === "dosen") {
      setDosen((prev) =>
        prev.map((it, i) => (i === index ? { ...it, [field]: value } : it))
      );
    } else {
      setMahasiswa((prev) =>
        prev.map((it, i) => (i === index ? { ...it, [field]: value } : it))
      );
    }
  };

  // Fungsi untuk handle upload file dan ubah ke Base64
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: "dosen" | "mahasiswa"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleChange(index, type, "image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addDosen = () =>
    setDosen((p) => [
      ...p,
      {
        name: "",
        role: "Dosen Pembimbing",
        email: "",
        image: "",
        github: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        website: "",
        category: "dosen",
      },
    ]);

  const addMahasiswa = () =>
    setMahasiswa((p) => [
      ...p,
      {
        name: "",
        role: "Anggota Tim Produksi PSTeam",
        email: "",
        image: "",
        github: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        website: "",
        category: "mahasiswa",
      },
    ]);

  const removeDosen = (i: number) =>
    setDosen((p) => p.filter((_, idx) => idx !== i));
  const removeMahasiswa = (i: number) =>
    setMahasiswa((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!teamTitle.trim()) {
      alert("Masukkan judul tim produksi terlebih dahulu!");
      return;
    }

    const all = [...dosen, ...mahasiswa];
    const hasEmptyName = all.some((it) => !it.name.trim());
    if (hasEmptyName) return alert("Pastikan semua nama terisi.");

    onAdd({
      teamTitle,
      members: all,
    });
    onClose();
  };

  const inputClass =
    "w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none text-gray-800 placeholder-gray-400 bg-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start md:items-center z-50 overflow-auto py-10">
      <div className="bg-white w-[95%] md:w-[90%] max-w-5xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#0a3b91] mb-6 text-center">
          Tambah Tim Pengembang Baru
        </h2>

        {/* === Input Judul Tim === */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700">
            Judul Tim Produksi *
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Contoh: Project Solar, Project AI, Project English Course"
            value={teamTitle}
            onChange={(e) => setTeamTitle(e.target.value)}
          />
        </div>

        {/* === Dosen Section === */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-blue-700">
              Dosen Pembimbing
            </h3>
            <button
              onClick={addDosen}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              <PlusCircle size={16} /> Tambah Dosen
            </button>
          </div>

          {dosen.map((d, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-white"
            >
              {/* Foto Upload */}
              <div className="md:col-span-3 flex items-center gap-4">
                <div className="w-20 h-20 border rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {d.image ? (
                    <img
                      src={d.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
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
                    onChange={(e) => handleImageUpload(e, i, "dosen")}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nama Dosen *
                </label>
                <input
                  className={inputClass}
                  value={d.name}
                  onChange={(e) =>
                    handleChange(i, "dosen", "name", e.target.value)
                  }
                  placeholder="Nama lengkap"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  className={inputClass}
                  value={d.email}
                  onChange={(e) =>
                    handleChange(i, "dosen", "email", e.target.value)
                  }
                  placeholder="email@contoh.com"
                />
              </div>

              {/* Sosial Media */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {["github", "linkedin", "facebook", "instagram", "website"].map(
                  (social) => (
                    <div key={social}>
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {social}
                      </label>
                      <input
                        className={inputClass}
                        value={(d as any)[social]}
                        onChange={(e) =>
                          handleChange(i, "dosen", social, e.target.value)
                        }
                        placeholder={`https://${social}.com/username`}
                      />
                    </div>
                  )
                )}
              </div>

              {dosen.length > 1 && (
                <button
                  onClick={() => removeDosen(i)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </section>

        {/* === Mahasiswa Section === */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-green-700">
              Anggota Mahasiswa
            </h3>
            <button
              onClick={addMahasiswa}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              <PlusCircle size={16} /> Tambah Mahasiswa
            </button>
          </div>

          {mahasiswa.map((m, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-white"
            >
              {/* Upload Foto Mahasiswa */}
              <div className="md:col-span-3 flex items-center gap-4">
                <div className="w-20 h-20 border rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
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
                    onChange={(e) => handleImageUpload(e, i, "mahasiswa")}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nama Mahasiswa *
                </label>
                <input
                  className={inputClass}
                  value={m.name}
                  onChange={(e) =>
                    handleChange(i, "mahasiswa", "name", e.target.value)
                  }
                  placeholder="Nama lengkap"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  className={inputClass}
                  value={m.email}
                  onChange={(e) =>
                    handleChange(i, "mahasiswa", "email", e.target.value)
                  }
                  placeholder="email@contoh.com"
                />
              </div>

              {/* Sosial Media */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {["github", "linkedin", "facebook", "instagram", "website"].map(
                  (social) => (
                    <div key={social}>
                      <label className="text-sm font-medium text-gray-700 capitalize">
                        {social}
                      </label>
                      <input
                        className={inputClass}
                        value={(m as any)[social]}
                        onChange={(e) =>
                          handleChange(i, "mahasiswa", social, e.target.value)
                        }
                        placeholder={`https://${social}.com/username`}
                      />
                    </div>
                  )
                )}
              </div>

              {mahasiswa.length > 1 && (
                <button
                  onClick={() => removeMahasiswa(i)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </section>

        {/* === Buttons === */}
        <div className="flex justify-end gap-3 mt-6">
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
            Simpan Tim
          </button>
        </div>
      </div>
    </div>
  );
}
