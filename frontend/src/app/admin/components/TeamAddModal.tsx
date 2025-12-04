"use client";

import { useEffect, useState } from "react";
import { X, PlusCircle, Trash } from "lucide-react";

type Row = {
  name: string;
  role: string;
  email: string;
  image?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  category: "dosen" | "mahasiswa";

  studyProgram?: string;
  education?: string;
  specialization?: string;
};

export default function AddTeamModal({
  onClose,
  onAdd,
  onAddMember,
  forProjectId,
  projectTitle,
  presetRole,
}: any) {
  const isAddMemberMode =
    typeof forProjectId !== "undefined" && forProjectId !== null;

  const [teamTitle, setTeamTitle] = useState<string>(projectTitle || "");

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
      studyProgram: "",
      education: "",
      specialization: "",
    },
  ]);

  const [mahasiswa, setMahasiswa] = useState<Row[]>([
    {
      name: "",
      role: "",
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

  useEffect(() => {
    if (projectTitle) setTeamTitle(projectTitle);
  }, [projectTitle]);

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

  const addDosenRow = () =>
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
        studyProgram: "",
        education: "",
        specialization: "",
      },
    ]);

  const addMahasiswaRow = () =>
    setMahasiswa((p) => [
      ...p,
      {
        name: "",
        role: "",
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
    // MODE TAMBAH SATU ANGGOTA
    if (isAddMemberMode && presetRole) {
      if (presetRole === "dosen") {
        const member = { ...dosen[0] };
        member.role = member.role?.trim()
          ? member.role
          : "Dosen Pembimbing";

        if (!member.name.trim())
          return alert("Nama Dosen tidak boleh kosong.");

        onAddMember?.(forProjectId, member);
        onClose();
        return;
      }

      if (presetRole === "mahasiswa") {
        const member = { ...mahasiswa[0] };
        member.role =
          member.role?.trim() ||
          `Anggota Tim Produksi ${projectTitle || teamTitle}`;

        if (!member.name.trim())
          return alert("Nama Mahasiswa tidak boleh kosong.");

        onAddMember?.(forProjectId, member);
        onClose();
        return;
      }
    }

    // MODE TAMBAH PROJECT + ANGGOTA
    if (!teamTitle.trim()) {
      return alert("Masukkan nama project terlebih dahulu!");
    }

    const finalDosen = dosen.map((d) => ({
      ...d,
      role: d.role.trim() ? d.role : "Dosen Pembimbing",
      category: "dosen" as const,
    }));

    const finalMahasiswa = mahasiswa.map((m) => ({
      ...m,
      role: m.role.trim()
        ? m.role
        : `Anggota Tim Produksi ${teamTitle}`,
      category: "mahasiswa" as const,
    }));

    const allMembers = [...finalDosen, ...finalMahasiswa];

    if (allMembers.some((it) => !it.name.trim())) {
      return alert("Nama tidak boleh kosong.");
    }

    // 🔥 FIX: ganti members → teamMembers
    onAdd?.({
      teamTitle,
      teamMembers: allMembers,
    });

    onClose();
  };

  const inputClass =
    "w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none text-gray-800 placeholder-gray-400 bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        role="dialog"
        className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0a3b91] mb-4 text-center">
            {isAddMemberMode
              ? `Tambah Anggota - ${projectTitle}`
              : "Tambah Tim Pengembang Baru"}
          </h2>

          {/* PROJECT TITLE */}
          {!isAddMemberMode && (
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Nama Project *
              </label>
              <input
                type="text"
                className={inputClass}
                value={teamTitle}
                placeholder="Contoh: PSTEAM, Project AI"
                onChange={(e) => setTeamTitle(e.target.value)}
              />
            </div>
          )}

          {/* ========================== DOSEN ========================== */}
          {(!isAddMemberMode || presetRole === "dosen") && (
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-blue-700">
                  Dosen Pembimbing
                </h3>

                {!isAddMemberMode && (
                  <button
                    onClick={addDosenRow}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <PlusCircle size={16} /> Tambah Dosen
                  </button>
                )}
              </div>

              {dosen.map((d, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-white"
                >
                  {/* FOTO PREVIEW */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-20 h-20 border rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {d.image ? (
                        <img
                          src={d.image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No Image
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Upload Foto
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="block mt-1 text-sm"
                        onChange={(e) =>
                          handleImageUpload(e, i, "dosen")
                        }
                      />
                    </div>
                  </div>

                  {/* NAMA */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Nama Dosen *
                    </label>
                    <input
                      className={inputClass}
                      value={d.name}
                      placeholder="Nama lengkap"
                      onChange={(e) =>
                        handleChange(i, "dosen", "name", e.target.value)
                      }
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      className={inputClass}
                      value={d.email}
                      placeholder="email@example.com"
                      onChange={(e) =>
                        handleChange(i, "dosen", "email", e.target.value)
                      }
                    />
                  </div>

                  {/* PROGRAM STUDI */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Program Studi
                    </label>
                    <input
                      className={inputClass}
                      value={d.studyProgram}
                      placeholder="Teknik Informatika"
                      onChange={(e) =>
                        handleChange(
                          i,
                          "dosen",
                          "studyProgram",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* EDUCATION */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Pendidikan
                    </label>
                    <input
                      className={inputClass}
                      value={d.education}
                      placeholder="Magister / Doktor"
                      onChange={(e) =>
                        handleChange(
                          i,
                          "dosen",
                          "education",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* SPECIALIZATION */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Spesialisasi
                    </label>
                    <input
                      className={inputClass}
                      value={d.specialization}
                      placeholder="Software Development"
                      onChange={(e) =>
                        handleChange(
                          i,
                          "dosen",
                          "specialization",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* SOCIALS */}
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {["github", "linkedin", "facebook", "instagram", "website"].map(
                      (social) => (
                        <div key={social}>
                          <label className="text-sm font-medium text-gray-700 capitalize">
                            {social}
                          </label>
                          <input
                            className={inputClass}
                            placeholder={`https://${social}.com/username`}
                            value={(d as any)[social]}
                            onChange={(e) =>
                              handleChange(
                                i,
                                "dosen",
                                social,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )
                    )}
                  </div>

                  {dosen.length > 1 && !isAddMemberMode && (
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
          )}

          {/* ========================== MAHASISWA ========================== */}
          {(!isAddMemberMode || presetRole === "mahasiswa") && (
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-green-700">
                  Anggota Mahasiswa
                </h3>

                {!isAddMemberMode && (
                  <button
                    onClick={addMahasiswaRow}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <PlusCircle size={16} /> Tambah Mahasiswa
                  </button>
                )}
              </div>

              {mahasiswa.map((m, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-white"
                >
                  {/* FOTO */}
                  <div className="md:col-span-3 flex items-center gap-4">
                    <div className="w-20 h-20 border rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {m.image ? (
                        <img
                          src={m.image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No Image
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Upload Foto
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="block mt-1 text-sm"
                        onChange={(e) =>
                          handleImageUpload(e, i, "mahasiswa")
                        }
                      />
                    </div>
                  </div>

                  {/* NAMA */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Nama Mahasiswa *
                    </label>
                    <input
                      className={inputClass}
                      value={m.name}
                      placeholder="Nama lengkap"
                      onChange={(e) =>
                        handleChange(i, "mahasiswa", "name", e.target.value)
                      }
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      className={inputClass}
                      value={m.email}
                      placeholder="email@example.com"
                      onChange={(e) =>
                        handleChange(i, "mahasiswa", "email", e.target.value)
                      }
                    />
                  </div>

                  {/* SOCIALS */}
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {["github", "linkedin", "facebook", "instagram", "website"].map(
                      (social) => (
                        <div key={social}>
                          <label className="text-sm font-medium text-gray-700 capitalize">
                            {social}
                          </label>
                          <input
                            className={inputClass}
                            placeholder={`https://${social}.com/username`}
                            value={(m as any)[social]}
                            onChange={(e) =>
                              handleChange(
                                i,
                                "mahasiswa",
                                social,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )
                    )}
                  </div>

                  {mahasiswa.length > 1 && !isAddMemberMode && (
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
          )}

          {/* ===================== BUTTON SUBMIT ===================== */}
          <div className="flex justify-end gap-3 mt-6">
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
              {isAddMemberMode ? "Tambah Anggota" : "Simpan Tim"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
