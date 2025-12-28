"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Lecturer, EducationHistory } from "./LecturersTable";
import { createPortal } from "react-dom";

type SuccessMode = "add" | "edit";

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

  /* ALERT */
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMode, setSuccessMode] = useState<SuccessMode>("add");
  const [successList, setSuccessList] = useState<EducationHistory[]>([]);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  /* LOAD DEFAULT */
  useEffect(() => {
    if (defaultData) {
      const clone = JSON.parse(JSON.stringify(defaultData));
      if (!clone.educationHistory) clone.educationHistory = [];
      setFormData(clone);
    }
  }, [defaultData]);

  /* RESET */
  useEffect(() => {
    if (!isOpen) {
      setFormData(null);
      setSuccessAlert(false);
      setDeleteAlert(false);
      setDeleteIndex(null);
      setSuccessList([]);
    }
  }, [isOpen]);

  if (!isOpen || !formData) return null;

  /* HANDLERS */
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
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            educationHistory: [
              ...prev.educationHistory,
              { degree: "", university: "", major: "" },
            ],
          }
        : prev
    );
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

  /* SUBMIT */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    const clean = formData.educationHistory.filter(
      (e) =>
        e.degree.trim() ||
        e.university.trim() ||
        e.major.trim()
    );

    const original = defaultData?.educationHistory || [];

    const added = clean.filter((_, i) => !original[i]);
    const edited = clean.filter((c, i) => {
      const o = original[i];
      return (
        o &&
        (o.degree !== c.degree ||
          o.university !== c.university ||
          o.major !== c.major)
      );
    });

    if (added.length > 0) {
      setSuccessMode("add");
      setSuccessList(added);
    } else {
      setSuccessMode("edit");
      setSuccessList(edited);
    }

    onSubmit({
      ...formData,
      educationHistory: clean,
    });

    setSuccessAlert(true);
  }

  const degreeOptions = [
    "Diploma (D3)",
    "Diploma (D4)",
    "Sarjana (S1)",
    "Magister (S2)",
    "Doktor (S3)",
  ];

  /* RENDER */
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => {
        if (successAlert || deleteAlert) return;
        onClose();
      }}
      lockScroll={successAlert || deleteAlert}
    >
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white text-gray-900">
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
            <ReadOnlyField
              label="Spesialisasi"
              value={formData.specialization}
            />
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
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <select
                  className="border rounded-lg p-2 w-full mb-3 text-gray-900 bg-white"
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
                  className="border rounded-lg p-2 w-full mb-3 text-gray-900"
                  placeholder="Universitas"
                  value={edu.university}
                  onChange={(e) =>
                    handleEduChange(index, "university", e.target.value)
                  }
                />

                <input
                  className="border rounded-lg p-2 w-full mb-4 text-gray-900"
                  placeholder="Jurusan"
                  value={edu.major}
                  onChange={(e) =>
                    handleEduChange(index, "major", e.target.value)
                  }
                />

                {/* 🔻 TOMBOL HAPUS DI BAWAH */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => askDelete(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Hapus
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
            title={
              successMode === "add"
                ? "Riwayat Pendidikan Ditambahkan"
                : "Riwayat Pendidikan Diperbarui"
            }
            message={
              <div className="text-left text-gray-900">
                <p className="mb-2 font-semibold">
                  {successMode === "add"
                    ? "Riwayat pendidikan baru:"
                    : "Riwayat pendidikan diperbarui:"}
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {successList.map((s, idx) => (
                    <li key={idx}>
                      {s.degree} — {s.university} ({s.major})
                    </li>
                  ))}
                </ul>
              </div>
            }
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

/* HELPERS */
function ReadOnlyField({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        disabled
        value={value || "-"}
        className="w-full bg-gray-200 border rounded px-3 py-2 text-gray-900"
      />
    </div>
  );
}

function Alert({ title, message, onOk, onCancel, danger }: any) {
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm border shadow-lg">
        <h3
          className={`font-bold mb-3 text-lg ${
            danger ? "text-red-600" : "text-blue-700"
          }`}
        >
          {title}
        </h3>

        <div className="mb-4 text-sm text-gray-900">{message}</div>

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
