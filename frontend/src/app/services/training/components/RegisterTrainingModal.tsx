"use client";

import React, { useState } from "react";

export default function RegisterTrainingModal({ open, course, onClose }: any) {
  if (!open || !course) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("Batch 1");
  const [notes, setNotes] = useState("");

  // FIX NORMALIZER — pastikan AI selalu terdeteksi
  function normalizeType(category: string) {
    const s = (category || "").toLowerCase();

    // urutan FIX (AI harus dicek dulu)
    if (s.includes("artificial")) return "ai";
    if (s.includes("machine")) return "ai";
    if (s.includes("ai")) return "ai";

    if (s.includes("web")) return "web";
    if (s.includes("mobile")) return "mobile";
    if (s.includes("iot") || s.includes("internet")) return "iot";

    return "iot";
  }

  const submit = async () => {
    if (!name.trim()) return alert("Nama wajib diisi.");
    if (!email.trim()) return alert("Email wajib diisi.");

    const detectedType = normalizeType(course.category);

    const payload = {
      name,
      email,
      phone,
      trainingTitle: course.title,
      trainingType: detectedType, // FIX 🔥
      batch,
      notes,
    };

    // debug log (tidak mengubah UI sama sekali)
    console.log("CATEGORY:", course.category);
    console.log("DETECTED TYPE:", detectedType);
    console.log("PAYLOAD:", payload);

    await fetch("http://localhost:4000/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Pendaftaran berhasil dikirim!");
    onClose();
  };

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

        <select
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setBatch(e.target.value)}
        >
          <option>Batch 1</option>
          <option>Batch 2</option>
          <option>Batch 3</option>
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
