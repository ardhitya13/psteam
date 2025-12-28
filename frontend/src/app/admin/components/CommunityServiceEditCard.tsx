"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { createPortal } from "react-dom";

/* =========================
   TYPES
========================= */
type CommunityServiceItem = {
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

type SuccessMode = "add" | "edit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData:
    | {
        lecId: number;
        communityserviceList: CommunityServiceItem[];
        lecturer_name: string;
        email: string;
        studyProgram: string;
        specialization: string;
      }
    | null;
  onSubmit: (payload: {
    lecId: number;
    communityserviceList: CommunityServiceItem[];
  }) => void;
}

/* =========================
   COMPONENT
========================= */
export default function EditCommunityServiceCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<{
    lecId: number;
    communityserviceList: CommunityServiceItem[];
    lecturer: LecturerInfo;
  } | null>(null);

  /* ALERT */
  const [successAlert, setSuccessAlert] = useState(false);
  const [successList, setSuccessList] = useState<CommunityServiceItem[]>([]);
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
        communityserviceList:
          defaultData.communityserviceList?.map((c) => ({
            id: c.id,
            title: c.title || "",
            year: c.year || new Date().getFullYear(),
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
        communityserviceList: [
          ...prev.communityserviceList,
          { title: "", year: new Date().getFullYear() },
        ],
      }
    );
  }

  function updateRow(
    index: number,
    key: keyof CommunityServiceItem,
    value: any
  ) {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.communityserviceList];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, communityserviceList: updated };
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
        communityserviceList: prev.communityserviceList.filter(
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

    const clean = form.communityserviceList.filter(
      (c) => c.title.trim() && c.year >= 1900
    );

    if (clean.length === 0) {
      alert("Minimal 1 pengabdian masyarakat harus valid.");
      return;
    }

    const original = defaultData?.communityserviceList || [];

    const added = clean.filter((c) => !c.id);
    const edited = clean.filter((c) =>
      original.some(
        (o) =>
          o.id === c.id &&
          (o.title !== c.title || o.year !== c.year)
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
      communityserviceList: clean,
    });

    setSuccessAlert(true);
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Pengabdian Masyarakat
        </h2>

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

        <form onSubmit={submit}>
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Daftar Pengabdian Masyarakat
              </h3>
              <button
                type="button"
                onClick={addRow}
                className="text-blue-600 font-semibold"
              >
                + Tambah Pengabdian
              </button>
            </div>

            {form.communityserviceList.map((c, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow mt-4 border border-gray-300"
              >
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  No. {idx + 1}
                </div>

                <textarea
                  className="border rounded-lg p-2 w-full mb-3 bg-white text-gray-900"
                  placeholder="Judul Pengabdian"
                  value={c.title}
                  onChange={(e) =>
                    updateRow(idx, "title", e.target.value)
                  }
                />

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1900}
                    max={2100}
                    className="border rounded-lg p-2 w-32 bg-white text-gray-900"
                    value={c.year}
                    onChange={(e) =>
                      updateRow(idx, "year", Number(e.target.value))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => askDelete(idx)}
                    className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
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
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
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
                ? "Berhasil Menambahkan Pengabdian!"
                : "Berhasil Memperbarui Pengabdian!"
            }
            message={
              <div className="text-left text-gray-800">
                <p className="mb-2 font-semibold">
                  {successMode === "add"
                    ? "Pengabdian masyarakat baru berhasil ditambahkan:"
                    : "Pengabdian masyarakat berhasil diperbarui:"}
                </p>
                <ul className="list-decimal pl-5 space-y-1">
                  {successList.map((c, idx) => (
                    <li key={idx}>{c.title}</li>
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
            message="Data pengabdian masyarakat ini akan dihapus."
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
        className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300"
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
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-semibold"
            >
              Batal
            </button>
          )}
          <button
            onClick={onOk}
            className={`px-4 py-2 rounded font-semibold text-white ${
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
