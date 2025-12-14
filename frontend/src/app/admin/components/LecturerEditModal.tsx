"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Lecturer, EducationHistory } from "./LecturersTable";
import { createPortal } from "react-dom";

/* =========================
   COMPONENT
========================= */
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

  /* ALERT STATE */
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  /* =========================
     LOAD DEFAULT DATA
  ========================= */
  useEffect(() => {
    if (defaultData) {
      const clone = JSON.parse(JSON.stringify(defaultData));
      if (!clone.educationHistory) clone.educationHistory = [];
      setFormData(clone);
    }
  }, [defaultData]);

  /* =========================
     RESET
  ========================= */
  useEffect(() => {
    if (!isOpen) {
      setFormData(null);
      setSuccessAlert(false);
      setDeleteAlert(false);
      setDeleteIndex(null);
    }
  }, [isOpen]);

  if (!isOpen || !formData) return null;

  /* =========================
     HANDLERS
  ========================= */
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

  function askDelete(index: number) {
    setDeleteIndex(index);
    setDeleteAlert(true);
  }

  function confirmDelete() {
    if (deleteIndex === null) return;

    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        educationHistory: prev.educationHistory.filter(
          (_, i) => i !== deleteIndex
        ),
      };
    });

    setDeleteAlert(false);
    setDeleteIndex(null);
  }

  /* =========================
     SUBMIT (AMAN)
  ========================= */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    const cleanedEducation = formData.educationHistory.filter(
      (e) =>
        e.degree.trim() !== "" ||
        e.university.trim() !== "" ||
        e.major.trim() !== ""
    );

    const cleaned: Lecturer = {
      ...formData,
      educationHistory: cleanedEducation,
    };

    onSubmit(cleaned);
    setSuccessAlert(true);
  }

  const degreeOptions = [
    "Diploma (D3)",
    "Diploma (D4)",
    "Sarjana (S1)",
    "Magister (S2)",
    "Doktor (S3)",
  ];

  /* =========================
     RENDER
  ========================= */
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => {
        if (successAlert || deleteAlert) return;
        onClose();
      }}
      lockScroll={successAlert || deleteAlert} // ✅ SEKARANG VALID
    >

      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Riwayat Pendidikan Dosen
        </h2>

        {/* INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnlyField label="Nama" value={formData.name} />
            <ReadOnlyField label="Email" value={formData.email} />
            <ReadOnlyField label="Program Studi" value={formData.studyProgram} />
            <ReadOnlyField label="Spesialisasi" value={formData.specialization} />
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Riwayat Pendidikan</h3>
              <button
                type="button"
                onClick={addEduRow}
                className="text-blue-600 font-semibold"
              >
                + Tambah Riwayat
              </button>
            </div>

            {formData.educationHistory.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-3 rounded-lg shadow mb-4"
              >
                <select
                  className="border rounded-lg p-2"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEduChange(index, "degree", e.target.value)
                  }
                >
                  <option value="">Pilih Jenjang</option>
                  {degreeOptions.map((opt) => (
                    <option key={opt} value={opt}>
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

                <div className="flex gap-2">
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
                    onClick={() => askDelete(index)}
                    className="bg-red-500 text-white px-3 rounded-lg"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

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

        {/* SUCCESS ALERT */}
        {successAlert && (
          <Alert
            title="Berhasil!"
            message="Perubahan riwayat pendidikan berhasil disimpan."
            onOk={() => {
              setSuccessAlert(false);
              onClose();
            }}
          />
        )}

        {/* DELETE ALERT */}
        {deleteAlert && (
          <Alert
            danger
            title="Hapus Data?"
            message="Riwayat pendidikan ini akan dihapus."
            onCancel={() => setDeleteAlert(false)}
            onOk={confirmDelete}
          />
        )}
      </div>
    </ModalWrapper>
  );
}

/* =========================
   HELPERS
========================= */
function ReadOnlyField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        disabled
        value={value || "-"}
        className="w-full bg-gray-200 border rounded px-3 py-2"
      />
    </div>
  );
}

function Alert({
  title,
  message,
  onOk,
  onCancel,
  danger,
}: any) {
  // 🔒 LOCK BODY SCROLL
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-center w-full max-w-sm">
        <h3
          className={`font-bold mb-2 ${
            danger ? "text-red-600" : "text-blue-600"
          }`}
        >
          {title}
        </h3>

        <p className="mb-4">{message}</p>

        <div className="flex justify-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Batal
            </button>
          )}
          <button
            onClick={onOk}
            className={`px-4 py-2 rounded text-white ${
              danger ? "bg-red-600" : "bg-blue-600"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}