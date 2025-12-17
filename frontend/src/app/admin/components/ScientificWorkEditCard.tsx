// components/EditScientificWorkCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { createPortal } from "react-dom";

/* =========================
   TYPES
========================= */
type ScientificWorkItem = {
  id?: number;
  title: string;
  type: string;
  year: number;
};

type LecturerInfo = {
  name: string;
  email: string;
  studyProgram: string;
  specialization: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData:
    | {
        lecId: number;
        scientificworkList: ScientificWorkItem[];
        lecturer_name: string;
        email: string;
        studyProgram: string;
        specialization: string;
      }
    | null;
  onSubmit: (payload: {
    lecId: number;
    scientificworkList: ScientificWorkItem[];
  }) => void;
}

/* =========================
   COMPONENT
========================= */
export default function EditScientificWorkCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<{
    lecId: number;
    scientificworkList: ScientificWorkItem[];
    lecturer: LecturerInfo;
  } | null>(null);

  const [successAlert, setSuccessAlert] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  /* =========================
     LOAD DEFAULT
  ========================= */
  useEffect(() => {
    if (defaultData) {
      setForm({
        lecId: defaultData.lecId,
        scientificworkList:
          defaultData.scientificworkList?.map((s) => ({
            id: s.id,
            title: s.title || "",
            type: s.type || "Artikel Ilmiah",
            year: s.year || new Date().getFullYear(),
          })) || [],
        lecturer: {
          name: defaultData.lecturer_name,
          email: defaultData.email,
          studyProgram: defaultData.studyProgram,
          specialization: defaultData.specialization,
        },
      });
    } else {
      setForm(null);
    }
  }, [defaultData]);

  /* =========================
     RESET
  ========================= */
  useEffect(() => {
    if (!isOpen) {
      setForm(null);
      setSuccessAlert(false);
      setSuccessTitle("");
      setDeleteAlert(false);
      setDeleteIndex(null);
    }
  }, [isOpen]);

  if (!isOpen || !form) return null;

  /* =========================
     HANDLERS
  ========================= */
  function addRow() {
    setForm((prev) =>
      prev && {
        ...prev,
        scientificworkList: [
          ...prev.scientificworkList,
          {
            title: "",
            type: "Artikel Ilmiah",
            year: new Date().getFullYear(),
          },
        ],
      }
    );
  }

  function updateRow(
    index: number,
    key: keyof ScientificWorkItem,
    value: any
  ) {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.scientificworkList];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, scientificworkList: updated };
    });
  }

  function askDelete(index: number) {
    setDeleteIndex(index);
    setDeleteAlert(true);
  }

  function confirmDelete() {
    if (deleteIndex === null) return;

    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        scientificworkList: prev.scientificworkList.filter(
          (_, i) => i !== deleteIndex
        ),
      };
    });

    setDeleteAlert(false);
    setDeleteIndex(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;

    const clean = form.scientificworkList.filter(
      (s) =>
        s.title.trim() !== "" &&
        s.type.trim() !== "" &&
        s.year >= 1900
    );

    if (clean.length === 0) {
      alert("Minimal 1 karya ilmiah harus valid.");
      return;
    }

    onSubmit({
      lecId: form.lecId,
      scientificworkList: clean,
    });

    setSuccessTitle(clean[0]?.title || "Karya Ilmiah");
    setSuccessAlert(true);
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <ModalWrapper
      isOpen={isOpen}
      lockScroll={successAlert || deleteAlert}
      onClose={() => {
        if (successAlert || deleteAlert) return;
        onClose();
      }}
    >
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl pb-10">
        {/* INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800">
            Informasi Pribadi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnly label="Nama" value={form.lecturer.name} />
            <ReadOnly label="Email" value={form.lecturer.email} />
            <ReadOnly label="Program Studi" value={form.lecturer.studyProgram} />
            <ReadOnly label="Spesialisasi" value={form.lecturer.specialization} />
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Daftar Karya Ilmiah
              </h3>
              <button
                type="button"
                onClick={addRow}
                className="text-blue-600 font-semibold"
              >
                + Tambah Karya
              </button>
            </div>

            {form.scientificworkList.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow mt-4 grid grid-cols-1 gap-4"
              >
                <textarea
                  className="border rounded-lg p-2 w-full"
                  value={s.title}
                  onChange={(e) =>
                    updateRow(idx, "title", e.target.value)
                  }
                />

                <div className="grid grid-cols-3 gap-4 items-end">
                  <select
                    className="border rounded-lg p-2 bg-white"
                    value={s.type}
                    onChange={(e) =>
                      updateRow(idx, "type", e.target.value)
                    }
                  >
                    <option value="Artikel Ilmiah">Artikel Ilmiah</option>
                    <option value="Jurnal Nasional">Jurnal Nasional</option>
                    <option value="Jurnal Nasional Terakreditasi">
                      Jurnal Nasional Terakreditasi
                    </option>
                    <option value="Jurnal Internasional">
                      Jurnal Internasional
                    </option>
                    <option value="Jurnal Internasional Terakreditasi">
                      Jurnal Internasional Terakreditasi
                    </option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>

                  <input
                    type="number"
                    min={1900}
                    max={3000}
                    className="border rounded-lg p-2"
                    value={s.year}
                    onChange={(e) =>
                      updateRow(idx, "year", Number(e.target.value))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => askDelete(idx)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
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

        {successAlert && (
          <Alert
            title="Berhasil!"
            message={`Karya ilmiah "${successTitle}" berhasil diperbarui.`}
            onOk={() => {
              setSuccessAlert(false);
              onClose();
            }}
          />
        )}

        {deleteAlert && (
          <Alert
            danger
            title="Hapus Data?"
            message="Data karya ilmiah ini akan dihapus."
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
function ReadOnly({ label, value }: any) {
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

function Alert({ title, message, onOk, onCancel, danger }: any) {
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
