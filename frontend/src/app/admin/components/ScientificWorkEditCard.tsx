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

type SuccessMode = "add" | "edit";

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

  /* ALERT */
  const [successAlert, setSuccessAlert] = useState(false);
  const [successList, setSuccessList] = useState<ScientificWorkItem[]>([]);
  const [successMode, setSuccessMode] = useState<SuccessMode>("add");

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

  /* RESET */
  useEffect(() => {
    if (!isOpen) {
      setForm(null);
      setSuccessAlert(false);
      setDeleteAlert(false);
      setDeleteIndex(null);
      setSuccessList([]);
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
      (s) => s.title.trim() && s.type.trim() && s.year >= 1900
    );

    if (clean.length === 0) {
      alert("Minimal 1 karya ilmiah harus valid.");
      return;
    }

    const original = defaultData?.scientificworkList || [];

    const added = clean.filter((s) => !s.id);
    const edited = clean.filter((s) =>
      original.some(
        (o) =>
          o.id === s.id &&
          (o.title !== s.title ||
            o.type !== s.type ||
            o.year !== s.year)
      )
    );

    if (added.length > 0) {
      setSuccessMode("add");
      setSuccessList(added);
    } else {
      setSuccessMode("edit");
      setSuccessList(edited);
    }

    onSubmit({
      lecId: form.lecId,
      scientificworkList: clean,
    });

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
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white text-gray-900">
        {/* INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnly label="Nama" value={form.lecturer.name} />
            <ReadOnly label="Email" value={form.lecturer.email} />
            <ReadOnly label="Program Studi" value={form.lecturer.studyProgram} />
            <ReadOnly label="Spesialisasi" value={form.lecturer.specialization} />
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Daftar Karya Ilmiah</h3>
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
                className="bg-white p-4 rounded-lg shadow mt-4 relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>

                <label className="text-sm font-semibold">
                  Judul Karya Ilmiah
                </label>
                <textarea
                  className="border rounded-lg p-3 w-full mt-1 bg-white text-gray-900"
                  value={s.title}
                  onChange={(e) =>
                    updateRow(idx, "title", e.target.value)
                  }
                />

                <div className="grid grid-cols-3 gap-4 items-end mt-3">
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
                    className="border rounded-lg p-2"
                    value={s.year}
                    onChange={(e) =>
                      updateRow(idx, "year", Number(e.target.value))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => askDelete(idx)}
                    className="bg-red-600 text-white px-3 py-2 rounded"
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
                ? "Berhasil Menambahkan Karya Ilmiah!"
                : "Berhasil Memperbarui Karya Ilmiah!"
            }
            message={
              <div className="text-left">
                <p className="mb-2 font-semibold">
                  {successMode === "add"
                    ? "Karya ilmiah baru berhasil ditambahkan:"
                    : "Karya ilmiah berhasil diperbarui:"}
                </p>
                <ul className="list-decimal pl-5 space-y-1">
                  {successList.map((s, idx) => (
                    <li key={idx}>{s.title}</li>
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
function ReadOnly({ label, value }: { label: string; value: any }) {
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

        <div className="mb-4 text-sm text-gray-800">{message}</div>

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
