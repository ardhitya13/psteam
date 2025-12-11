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

  // LOAD DEFAULT DATA
  useEffect(() => {
    if (defaultData) {
      const clone = JSON.parse(JSON.stringify(defaultData));

      // jika null jadikan array kosong
      if (!clone.educationHistory) clone.educationHistory = [];

      setFormData(clone);
    }
  }, [defaultData]);

  // RESET
  useEffect(() => {
    if (!isOpen) setFormData(null);
  }, [isOpen]);

  if (!isOpen || !formData) return null;

  // ==========================================================
  // HANDLE EDUCATION CHANGES
  // ==========================================================
  function handleEduChange(
    index: number,
    key: keyof EducationHistory,
    value: string
  ) {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.educationHistory];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, educationHistory: updated };
    });
  }

  function addEduRow() {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        educationHistory: [
          ...prev.educationHistory,
          { degree: "", university: "", major: "" },
        ],
      };
    });
  }

  function removeEduRow(index: number) {
    setFormData((prev) => {
      if (!prev) return prev;

      const updated = prev.educationHistory.filter((_, i) => i !== index);

      return { ...prev, educationHistory: updated };
    });
  }

  // ==========================================================
  // SUBMIT HANDLER
  // ==========================================================
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData!);
    onClose();
  }

  // ==========================================================
  // DROPDOWN OPTIONS
  // ==========================================================
  const degreeOptions = [
    "Diploma (D3)",
    "Diploma (D4)",
    "Sarjana (S1)",
    "Magister (S2)",
    "Doktor (S3)",
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Edit Riwayat Pendidikan Dosen
        </h2>

        {/* INFORMASI PRIBADI — READ ONLY */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Informasi Pribadi</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField label="Nama" value={formData.name} />
            <ReadOnlyField label="Email" value={formData.email} />
            <ReadOnlyField label="Program Studi" value={formData.studyProgram} />
            <ReadOnlyField label="Spesialisasi" value={formData.specialization} />
          </div>
        </div>

        {/* FORM RIWAYAT PENDIDIKAN */}
        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Riwayat Pendidikan</h3>

              <button
                type="button"
                onClick={addEduRow}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                + Tambah Riwayat
              </button>
            </div>

            {/* IF NO HISTORY */}
            {formData.educationHistory.length === 0 && (
              <p className="text-gray-500 italic mb-4">
                Belum ada riwayat pendidikan.
              </p>
            )}

            {formData.educationHistory.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black bg-white p-3 rounded-lg shadow mb-4"
              >
                {/* DEGREE DROPDOWN */}
                <select
                  className="border rounded-lg p-2"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEduChange(index, "degree", e.target.value)
                  }
                >
                  <option value="">Pilih Jenjang</option>
                  {degreeOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <input
                  className="border rounded-lg p-2"
                  placeholder="Universitas"
                  value={edu.university}
                  onChange={(e) =>
                    handleEduChange(index, "university", e.target.value)
                  }
                />

                <div className="flex gap-2 items-center">
                  <input
                    className="border rounded-lg p-2 w-full"
                    placeholder="Jurusan"
                    value={edu.major}
                    onChange={(e) =>
                      handleEduChange(index, "major", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeEduRow(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}

// ==========================
// READ ONLY FIELD COMPONENT
// ==========================
function ReadOnlyField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        disabled
        value={value || "-"}
        className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 border border-gray-300"
      />
    </div>
  );
}
