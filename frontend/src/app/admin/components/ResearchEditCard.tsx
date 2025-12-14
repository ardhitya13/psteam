"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { createPortal } from "react-dom";

/* =========================
   TYPES
========================= */
type ResearchItem = {
  id?: number;
  title: string;
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
        researchList: ResearchItem[];
        lecturer_name: string;
        email: string;
        studyProgram: string;
        specialization: string;
      }
    | null;
  onSubmit: (payload: { lecId: number; researchList: ResearchItem[] }) => void;
}

/* =========================
   COMPONENT
========================= */
export default function EditResearchCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<{
    lecId: number;
    researchList: ResearchItem[];
    lecturer: LecturerInfo;
  } | null>(null);

  /* ALERT STATE */
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
        researchList:
          defaultData.researchList?.map((r) => ({
            id: r.id,
            title: r.title || "",
            year: r.year || new Date().getFullYear(),
          })) || [],
        lecturer: {
          name: defaultData.lecturer_name,
          email: defaultData.email,
          studyProgram: defaultData.studyProgram,
          specialization: defaultData.specialization,
        },
      });
    }
  }, [defaultData]);

  /* =========================
     RESET
  ========================= */
  useEffect(() => {
    if (!isOpen) {
      setForm(null);
      setSuccessAlert(false);
      setDeleteAlert(false);
      setDeleteIndex(null);
      setSuccessTitle("");
    }
  }, [isOpen]);

  if (!isOpen || !form) return null;

  /* =========================
     HANDLERS
  ========================= */
  function addResearchRow() {
    setForm((prev) =>
      prev && {
        ...prev,
        researchList: [
          ...prev.researchList,
          { title: "", year: new Date().getFullYear() },
        ],
      }
    );
  }

  function updateResearchRow(
    index: number,
    key: keyof ResearchItem,
    value: any
  ) {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.researchList];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, researchList: updated };
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
        researchList: prev.researchList.filter(
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

    const clean = form.researchList.filter(
      (r) => r.title.trim() !== "" && r.year >= 1900
    );

    if (clean.length === 0) {
      alert("Minimal 1 penelitian harus valid.");
      return;
    }

    onSubmit({
      lecId: form.lecId,
      researchList: clean,
    });

    setSuccessTitle(clean[0]?.title || "Penelitian");
    setSuccessAlert(true);
  }

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
      lockScroll={successAlert || deleteAlert}
    >
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl text-black">
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Penelitian Dosen
        </h2>

        {/* INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnly label="Nama" value={form.lecturer.name} />
            <ReadOnly label="Email" value={form.lecturer.email} />
            <ReadOnly
              label="Program Studi"
              value={form.lecturer.studyProgram}
            />
            <ReadOnly
              label="Spesialisasi"
              value={form.lecturer.specialization}
            />
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Daftar Penelitian</h3>
              <button
                type="button"
                onClick={addResearchRow}
                className="text-blue-600 font-semibold"
              >
                + Tambah Penelitian
              </button>
            </div>

            {form.researchList.map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow mt-4"
              >
                <label className="text-sm font-semibold">
                  Judul Penelitian
                </label>
                <textarea
                  className="border rounded-lg p-2 w-full mt-1"
                  value={r.title}
                  onChange={(e) =>
                    updateResearchRow(idx, "title", e.target.value)
                  }
                />

                <div className="flex items-center gap-4 mt-3">
                  <input
                    type="number"
                    min={1900}
                    className="border rounded-lg p-2 w-32"
                    value={r.year}
                    onChange={(e) =>
                      updateResearchRow(
                        idx,
                        "year",
                        Number(e.target.value)
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() => askDelete(idx)}
                    className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
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
              Simpan
            </button>
          </div>
        </form>

        {/* SUCCESS ALERT */}
        {successAlert && (
          <Alert
            title="Berhasil!"
            message={`Penelitian "${successTitle}" berhasil diperbarui.`}
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
            message="Penelitian ini akan dihapus."
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

function Alert({
  title,
  message,
  onOk,
  onCancel,
  danger,
}: any) {
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
