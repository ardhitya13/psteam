"use client";

import React, { useState } from "react";

export default function RegisterTrainingModal({ open, course, onClose }: any) {
  if (!open || !course) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [notes, setNotes] = useState("");

  // ===============================
  // CATEGORY NORMALIZER (FINAL FIX)
  // ===============================
  function normalizeType(category: string) {
    const s = (category || "").toLowerCase();

    if (s.includes("artificial") || s.includes("machine") || s.includes("ai"))
      return "ai";

    if (s.includes("web")) return "web";
    if (s.includes("mobile")) return "mobile";
    if (s.includes("iot") || s.includes("internet")) return "iot";

    return "iot"; // default fallback
  }

  // ===============================
  // DYNAMIC BATCH LIST (from backend)
  // ===============================
  const batchOptions =
    course.schedule && Array.isArray(course.schedule) && course.schedule.length > 0
      ? course.schedule.map((b: any) => b.batchName)
      : ["Batch 1"];

  // Set default batch (first one)
  if (!batch) setBatch(batchOptions[0]);

  // ===============================
  // SUBMIT FORM
  // ===============================
  const submit = async () => {
    if (!name.trim()) return alert("Nama wajib diisi.");
    if (!email.trim()) return alert("Email wajib diisi.");

    const detectedType = normalizeType(course.category);

    const payload = {
      name,
      email,
      phone,
      trainingTitle: course.title,
      trainingType: detectedType,
      batch,
      notes,
      status: "pending",
    };

    console.log("REGISTER PAYLOAD:", payload);

    try {
      await fetch("http://localhost:4000/api/training-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Pendaftaran berhasil dikirim!");
      onClose();
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Gagal mengirim pendaftaran.");
    }
  };


  // ===============================
  // UI (TIDAK DIUBAH SAMA SEKALI)
  // ===============================
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-[380px] shadow-lg">
        <h2 className="text-xl font-bold mb-3">Daftar Pelatihan</h2>

        <p className="text-sm mb-3">{course.title}</p>

        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Nama Lengkap"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Nomor HP"
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* BATCH SELECT (now dynamic) */}
        <select
          className="w-full border p-2 rounded mb-2"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          {batchOptions.map((b: string, i: number) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </select>

        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Catatan (opsional)"
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
          onClick={submit}
        >
          Kirim Pendaftaran
        </button>

        <button
          className="w-full bg-gray-300 text-black py-2 rounded mt-2"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
