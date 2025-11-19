// admin/components/EditLecturerModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Lecturer, EducationHistory } from "./LecturersTable";

export default function EditLecturerModal({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultData: Lecturer | null;
  onSubmit: (updated: Lecturer) => void;
}) {
  const [formData, setFormData] = useState<Lecturer | null>(null);

  // FOTO HANDLING
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (defaultData) {
      const clone = JSON.parse(JSON.stringify(defaultData));
      setFormData(clone);
      setPreview(clone.imageUrl || null); // tampilkan foto lama
    }
  }, [defaultData]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(null);
      setPreview(null);
      setImageFile(null);
    }
  }, [isOpen]);

  if (!isOpen || !formData) return null;

  function handleField<K extends keyof Lecturer>(key: K, value: Lecturer[K]) {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handleEduChange(
    index: number,
    key: keyof EducationHistory,
    value: string
  ) {
    if (!formData) return;

    const updated = formData.educationHistory.map((row, i) =>
      i === index ? { ...row, [key]: value } : row
    );

    setFormData({ ...formData, educationHistory: updated });
  }

  function addEduRow() {
    if (!formData) return;

    setFormData({
      ...formData,
      educationHistory: [
        ...formData.educationHistory,
        { degree: "", university: "", major: "" },
      ],
    });
  }

  function removeEduRow(i: number) {
    if (!formData) return;

    setFormData({
      ...formData,
      educationHistory: formData.educationHistory.filter(
        (_, idx) => idx !== i
      ),
    });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // live preview
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    const finalImage =
      imageFile !== null ? preview || "" : formData.imageUrl;

    onSubmit({
      ...formData,
      imageUrl: finalImage,
    });

    onClose();
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* FOTO DI TENGAH */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-blue-400 shadow-xl">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>

          <label className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 cursor-pointer text-base">
            Ganti Foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <p className="text-xs text-gray-500 mt-2">Edit Foto</p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Edit Data Dosen
        </h2>

        <form onSubmit={submit} className="space-y-8">

          {/* INPUT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField
              label="Nama Dosen"
              value={formData.name}
              placeholder="Nama lengkap"
              onChange={(e: any) => handleField("name", e.target.value)}
            />

            <InputField
              label="Program Studi"
              value={formData.program}
              placeholder="Contoh: Teknik Informatika"
              onChange={(e: any) => handleField("program", e.target.value)}
            />

            <InputField
              label="Jenjang Pendidikan"
              value={formData.educationLevel}
              placeholder="S1 / S2 / S3"
              onChange={(e: any) =>
                handleField("educationLevel", e.target.value)
              }
            />

            <InputField
              label="Email"
              value={formData.email}
              placeholder="email@example.com"
              onChange={(e: any) => handleField("email", e.target.value)}
            />

            <InputField
              label="Spesialisasi"
              className="md:col-span-2"
              value={formData.specialization}
              placeholder="Keahlian / bidang mengajar"
              onChange={(e: any) => handleField("specialization", e.target.value)}
            />
          </div>

          {/* RIWAYAT PENDIDIKAN */}
          <div className="border bg-gray-50 rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Riwayat Pendidikan
              </h3>

              <button
                type="button"
                onClick={addEduRow}
                className="text-blue-600 text-lg hover:text-blue-800"
              >
                + Tambah Riwayat
              </button>
            </div>

            {formData.educationHistory.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <InputField
                  placeholder="Jenjang (S1 / S2 / S3)"
                  value={edu.degree}
                  onChange={(e: any) =>
                    handleEduChange(index, "degree", e.target.value)
                  }
                />

                <InputField
                  placeholder="Nama Universitas"
                  value={edu.university}
                  onChange={(e: any) =>
                    handleEduChange(index, "university", e.target.value)
                  }
                />

                <div className="flex gap-3 items-center">
                  <input
                    className="
                      w-full px-4 py-3 rounded-xl
                      border border-gray-300
                      bg-white text-gray-900 placeholder-gray-500 text-lg
                      focus:ring-2 focus:ring-blue-500
                    "
                    placeholder="Jurusan"
                    value={edu.major}
                    onChange={(e) =>
                      handleEduChange(index, "major", e.target.value)
                    }
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEduRow(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-xl text-gray-800 text-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-lg font-semibold"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}

/* REUSABLE INPUT */
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
        <label className="text-lg font-semibold text-gray-700">
          {label}
        </label>
      )}

      <input
        className="
          mt-2 w-full px-5 py-4 rounded-xl
          border border-gray-300
          bg-white text-gray-900 placeholder-gray-500 text-lg
          focus:ring-2 focus:ring-blue-500
        "
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
