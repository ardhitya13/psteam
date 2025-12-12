// components/EditResearchCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { X } from "lucide-react";

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

  const [successAlert, setSuccessAlert] = useState(false);
  const [successTitle, setSuccessTitle] = useState<string>("");

  // LOAD DEFAULT
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
    } else {
      setForm(null);
    }
  }, [defaultData]);

  // RESET ON CLOSE
  useEffect(() => {
    if (!isOpen) {
      setForm(null);
      setSuccessAlert(false);
      setSuccessTitle("");
    }
  }, [isOpen]);

  if (!isOpen || !form) return null;

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

  function updateResearchRow(index: number, key: keyof ResearchItem, value: any) {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.researchList];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, researchList: updated };
    });
  }

  function removeResearchRow(index: number) {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        researchList: prev.researchList.filter((_, i) => i !== index),
      };
    });
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

    // trigger parent update (parent must NOT close the modal immediately)
    onSubmit({
      lecId: form.lecId,
      researchList: clean,
    });

    // show internal success alert — modal stays open until user taps OK
    setSuccessTitle(clean[0]?.title || "Penelitian");
    setSuccessAlert(true);
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-white text-black max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl font-bold text-gray-900 w-full text-center">Edit Penelitian Dosen</h2>
          <button onClick={onClose} className="absolute right-2 top-0 p-2">
            <X size={22} className="text-gray-700" />
          </button>
        </div>

        {/* PERSONAL INFO */}
        <div className="border rounded-xl p-4 bg-gray-50 mb-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReadOnly label="Nama" value={form.lecturer.name} />
            <ReadOnly label="Email" value={form.lecturer.email} />
            <ReadOnly label="Program Studi" value={form.lecturer.studyProgram} />
            <ReadOnly label="Spesialisasi" value={form.lecturer.specialization} />
          </div>
        </div>

        {/* LIST FORM */}
        <form onSubmit={submit} className="pb-10">
          <div className="border bg-gray-50 rounded-xl p-5 shadow mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Daftar Penelitian</h3>
              <button type="button" onClick={addResearchRow} className="text-blue-600 hover:text-blue-800 font-semibold">+ Tambah Penelitian</button>
            </div>

            {form.researchList.length === 0 && <p className="text-gray-500 italic mt-4">Belum ada penelitian.</p>}

            {form.researchList.map((r, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold">Judul Penelitian</label>
                  <textarea
                    className="border rounded-lg p-2 w-full min-h-[56px]"
                    value={r.title}
                    onChange={(e) => updateResearchRow(idx, "title", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-semibold">Tahun</label>
                    <input
                      type="number"
                      min={1900}
                      max={2100}
                      className="border rounded-lg p-2 w-32"
                      value={r.year}
                      onChange={(e) => updateResearchRow(idx, "year", Number(e.target.value))}
                    />
                  </div>

                  <button type="button" onClick={() => removeResearchRow(idx)} className="ml-auto bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Hapus</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3 bg-gray-300 rounded-lg">Batal</button>
            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg">Simpan Perubahan</button>
          </div>
        </form>

        {/* SUCCESS ALERT (inside modal) */}
        {successAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">Perubahan Berhasil!</h3>
              <p className="text-sm text-gray-700 mb-6">Penelitian <b>{successTitle}</b> berhasil diperbarui.</p>
              <button
                onClick={() => {
                  setSuccessAlert(false);
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

function ReadOnly({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input disabled value={value || "-"} className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 border border-gray-300" />
    </div>
  );
}
