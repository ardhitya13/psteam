"use client";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Lecturer, EducationHistory } from "./LecturersTable";

const DEGREE_OPTIONS = [
  { value: "Diploma D3", label: "Diploma (D3)" },
  { value: "Diploma D4", label: "Diploma (D4)" },
  { value: "Sarjana S1", label: "Sarjana (S1)" },
  { value: "Magister S2", label: "Magister (S2)" },
  { value: "Doktor S3", label: "Doktor (S3)" },
];

export default function AddLecturerModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Lecturer, "id">) => void;
}) {
  const [formData, setFormData] = useState<Omit<Lecturer, "id">>({
    name: "",
    position: "Dosen",
    program: "",
    educationLevel: "",
    email: "",
    specialization: "",
    imageUrl: "",
    educationHistory: [{ degree: "S1", university: "", major: "" }],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleField(key: keyof Omit<Lecturer, "id">, val: any) {
    setFormData((prev) => ({ ...prev, [key]: val }));
  }

  function handleEduChange(i: number, key: keyof EducationHistory, val: string) {
    setFormData((prev) => {
      const rows = [...prev.educationHistory];
      rows[i][key] = val;
      return { ...prev, educationHistory: rows };
    });
  }

  function addEduRow() {
    const len = formData.educationHistory.length;
    const auto = len === 0 ? "S1" : len === 1 ? "S2" : len === 2 ? "S3" : "S1";

    setFormData((prev) => ({
      ...prev,
      educationHistory: [...prev.educationHistory, { degree: auto, university: "", major: "" }],
    }));
  }

  function removeEduRow(i: number) {
    setFormData((prev) => ({
      ...prev,
      educationHistory: prev.educationHistory.filter((_, idx) => idx !== i),
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    let img = formData.imageUrl;
    if (imageFile) img = preview || "";
    onSubmit({ ...formData, imageUrl: img });
    onClose();
  }

  function resetForm() {
    setFormData({
      name: "",
      position: "Dosen",
      program: "",
      educationLevel: "",
      email: "",
      specialization: "",
      imageUrl: "",
      educationHistory: [{ degree: "S1", university: "", major: "" }],
    });
    setPreview(null);
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-7xl
          mx-auto
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
          animate-fadeIn
        "
        style={{ maxHeight: "92vh" }}
      >
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
          Tambah Dosen
        </h2>

        <form onSubmit={submit} className="space-y-10">

          {/* ========= FOTO ========= */}
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 rounded-full overflow-hidden bg-gray-200 border-4 border-blue-400 shadow-lg">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                  No Image
                </div>
              )}
            </div>

            <label className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 cursor-pointer text-lg">
              Pilih Foto
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* ========= INPUT GRID ========= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Nama */}
            <InputField
              label="Nama Dosen *"
              value={formData.name}
              placeholder="Nama lengkap"
              onChange={(e: any) => handleField("name", e.target.value)}
            />

            {/* Prodi */}
            <InputField
              label="Program Studi *"
              value={formData.program}
              placeholder="Contoh: Teknik Informatika"
              onChange={(e: any) => handleField("program", e.target.value)}
            />

            {/* Jenjang */}
            <div>
              <label className="text-lg font-semibold text-gray-700">Jenjang Pendidikan</label>
              <select
                className="mt-2 border border-gray-300 px-5 py-4 rounded-xl w-full bg-white text-gray-900 placeholder-gray-500 text-lg focus:ring-2 focus:ring-blue-500"
                value={formData.educationLevel}
                onChange={(e) => handleField("educationLevel", e.target.value)}
              >
                <option value="">-- Pilih Jenjang --</option>
                {DEGREE_OPTIONS.map((op) => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <InputField
              label="Email"
              value={formData.email}
              placeholder="email@example.com"
              onChange={(e: any) => handleField("email", e.target.value)}
            />

            {/* Spesialisasi */}
            <InputField
              label="Spesialisasi"
              className="md:col-span-2"
              value={formData.specialization}
              placeholder="Software Development, AI, Networking..."
              onChange={(e: any) => handleField("specialization", e.target.value)}
            />
          </div>

          {/* ========= RIWAYAT PENDIDIKAN ========= */}
          <div className="border rounded-2xl p-8 bg-gray-50 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Riwayat Pendidikan</h3>

              <button
                type="button"
                onClick={addEduRow}
                className="text-blue-600 hover:text-blue-800 text-lg font-medium"
              >
                + Tambah Riwayat
              </button>
            </div>

            {formData.educationHistory.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">

                <select
                  className="border border-gray-300 px-5 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 text-lg focus:ring-2 focus:ring-blue-500"
                  value={edu.degree}
                  onChange={(e) => handleEduChange(index, "degree", e.target.value)}
                >
                  {DEGREE_OPTIONS.map((op) => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                  ))}
                </select>

                <InputField
                  placeholder="Nama Universitas"
                  value={edu.university}
                  onChange={(e: any) => handleEduChange(index, "university", e.target.value)}
                />

                <div className="flex gap-4 items-center">
                  <input
                    className="
                      border border-gray-300
                      px-5 py-4 rounded-xl w-full
                      bg-white text-gray-900 placeholder-gray-500 text-lg
                      focus:ring-2 focus:ring-blue-500
                    "
                    placeholder="Jurusan"
                    value={edu.major}
                    onChange={(e) => handleEduChange(index, "major", e.target.value)}
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEduRow(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-lg"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ========= BUTTON ========= */}
          <div className="flex justify-end gap-6 mt-8">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-7 py-4 bg-gray-300 hover:bg-gray-400 rounded-xl shadow text-gray-800 text-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow text-xl font-semibold"
            >
              Tambah Dosen
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: any) {
  return (
    <div className={className}>
      {label && (
        <label className="text-lg font-semibold text-gray-700">{label}</label>
      )}
      <input
        className="
          mt-2 w-full px-5 py-4 rounded-xl
          border border-gray-300 bg-white
          text-gray-900 placeholder-gray-500 text-lg
          focus:ring-2 focus:ring-blue-500
        "
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
