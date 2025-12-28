"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { createPortal } from "react-dom";

/* =========================
   TYPES
========================= */


type IPItem = {
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
    intellectualpropertyList: IPItem[];
    lecturer_name: string;
    email: string;
    studyProgram: string;
    specialization: string;
  }
  | null;
  onSubmit: (payload: {
    lecId: number;
    intellectualpropertyList: IPItem[];
  }) => void;
}

/* =========================
   COMPONENT
========================= */
export default function EditIntellectualPropertyCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<{
    lecId: number;
    intellectualpropertyList: IPItem[];
    lecturer: LecturerInfo;
  } | null>(null);

  /* ALERT */
  const [successAlert, setSuccessAlert] = useState(false);
  const [successList, setSuccessList] = useState<IPItem[]>([]);
  const [successMode, setSuccessMode] = useState<SuccessMode>("add");

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const HKI_TYPES = [
    "Hak Cipta Nasional",
    "Hak Cipta Internasional",
    "Desain Industri",
    "Paten Sederhana",
    "Paten",
    "Merek",
    "Rahasia Dagang",
    "Lain-Lain",
  ];


  /* =========================
     LOAD DEFAULT
  ========================= */
  useEffect(() => {
    if (defaultData) {
      setForm({
        lecId: defaultData.lecId,
        intellectualpropertyList:
          defaultData.intellectualpropertyList?.map((i) => ({
            id: i.id,
            title: i.title || "",
            type: i.type || "Hak Cipta Nasional",
            year: i.year || new Date().getFullYear(),
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
        intellectualpropertyList: [
          ...prev.intellectualpropertyList,
          {
            title: "",
            type: "Hak Cipta Nasional",
            year: new Date().getFullYear(),
          },
        ],
      }
    );
  }

  function updateRow(index: number, key: keyof IPItem, value: any) {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.intellectualpropertyList];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, intellectualpropertyList: updated };
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
        intellectualpropertyList: prev.intellectualpropertyList.filter(
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

    const clean = form.intellectualpropertyList.filter(
      (i) => i.title.trim() && i.type.trim() && i.year >= 1900
    );

    if (clean.length === 0) {
      alert("Minimal 1 HKI harus valid.");
      return;
    }

    const original = defaultData?.intellectualpropertyList || [];

    const added = clean.filter((i) => !i.id);
    const edited = clean.filter((i) =>
      original.some(
        (o) =>
          o.id === i.id &&
          (o.title !== i.title ||
            o.type !== i.type ||
            o.year !== i.year)
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
      intellectualpropertyList: clean,
    });

    setSuccessAlert(true);
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl pb-10 bg-white text-gray-800">
        {/* INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="font-bold mb-3">Informasi Pribadi</h3>
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
            <div className="flex justify-between mb-3">
              <h3 className="font-bold">Daftar HKI</h3>
              <button
                type="button"
                onClick={addRow}
                className="text-blue-600 font-semibold"
              >
                + Tambah HKI
              </button>
            </div>

            {form.intellectualpropertyList.map((i, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow mt-4 border border-gray-300"
              >
                <div className="font-semibold text-sm text-gray-700 mb-2">
                  No. {idx + 1}
                </div>

                {/* JUDUL */}
                <textarea
                  value={i.title}
                  onChange={(e) => updateRow(idx, "title", e.target.value)}
                  placeholder="Judul HKI"
                  className="border rounded p-2 w-full mb-3 text-gray-900 bg-white"
                />

                <div className="grid grid-cols-3 gap-4 items-end">
                  {/* JENIS HKI */}
                  <select
                    value={i.type}
                    onChange={(e) => updateRow(idx, "type", e.target.value)}
                    className="border rounded p-2 bg-white text-gray-900"
                  >
                    {HKI_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  {/* TAHUN */}
                  <input
                    type="number"
                    value={i.year}
                    onChange={(e) =>
                      updateRow(idx, "year", Number(e.target.value))
                    }
                    className="border rounded p-2 text-gray-900 bg-white"
                  />

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => askDelete(idx)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-2"
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
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>

        {/* SUCCESS ALERT */}
        {successAlert && (
          <Alert
            title={
              successMode === "add"
                ? "Berhasil Menambahkan HKI!"
                : "Berhasil Memperbarui HKI!"
            }
            message={
              <div className="text-left text-gray-800">
                <p className="mb-2 font-semibold">
                  {successMode === "add"
                    ? "HKI baru berhasil ditambahkan:"
                    : "HKI berhasil diperbarui:"}
                </p>
                <ul className="list-decimal pl-5 space-y-1">
                  {successList.map((i, idx) => (
                    <li key={idx}>{i.title}</li>
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
            message="Data HKI ini akan dihapus."
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
        className="w-full bg-gray-200 border rounded px-3 py-2 text-gray-800"
      />
    </div>
  );
}

function Alert({ title, message, onOk, onCancel, danger }: any) {
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm border shadow-lg">
        <h3
          className={`font-bold mb-3 ${danger ? "text-red-600" : "text-blue-600"
            }`}
        >
          {title}
        </h3>

        <div className="mb-4 text-sm text-gray-800">{message}</div>

        <div className="flex justify-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Batal
            </button>
          )}
          <button
            onClick={onOk}
            className={`px-4 py-2 rounded text-white ${danger ? "bg-red-600" : "bg-blue-600"
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
