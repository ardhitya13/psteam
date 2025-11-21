"use client";
import React, { useState, useEffect } from "react";

interface EditIntellectualPropertyCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultData: {
    no: number;
    title: string;
    type: string;
    year: number;
  } | null;
}

export default function EditIntellectualPropertyCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditIntellectualPropertyCardProps) {
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [year, setyear] = useState("");

  useEffect(() => {
    if (defaultData) {
      settitle(defaultData.title);
      settype(defaultData.type);
      setyear(String(defaultData.year));
    }
  }, [defaultData]);

  if (!isOpen || !defaultData) return null;

  const handleUpdate = () => {
    onSubmit({
      no: defaultData.no,
      title,
      type,
      year: Number(year),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit HKI</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          value={type}
          onChange={(e) => settype(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
        />

        <input
          type="number"
          value={year}
          onChange={(e) => setyear(e.target.value)}
          className="border px-3 py-2 w-full mb-3 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 bg-gray-300 rounded">
            Batal
          </button>
          <button onClick={handleUpdate} className="px-3 py-2 bg-blue-600 text-white rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
