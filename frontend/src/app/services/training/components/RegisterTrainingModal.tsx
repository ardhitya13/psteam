"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DEFAULT_IMAGE = "/images/training-default.jpg"; // HARUS ADA di /public/images

type Props = {
  open: boolean;
  course: any;
  onClose: () => void;
};

export default function RegisterTrainingModal({
  open,
  course,
  onClose,
}: Props) {
  if (!open || !course) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [notes, setNotes] = useState("");

  /* =====================================================
     THUMBNAIL
  ===================================================== */
  const thumbnail = course.img || DEFAULT_IMAGE;

  /* =====================================================
     BATCH LIST
  ===================================================== */
  const batchOptions =
    Array.isArray(course.schedule) && course.schedule.length > 0
      ? course.schedule.map((b: any) => b.batchName)
      : ["Batch 1"];

  useEffect(() => {
    if (!batch && batchOptions.length > 0) {
      setBatch(batchOptions[0]);
    }
  }, [batch, batchOptions]);

  /* =====================================================
     VALIDATORS
  ===================================================== */
  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isNumeric = (value: string) => {
    return /^[0-9]+$/.test(value);
  };

  /* =====================================================
     SUBMIT
  ===================================================== */
  const submit = async () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nama belum diisi",
        text: "Silakan masukkan nama lengkap Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email belum diisi",
        text: "Email diperlukan untuk konfirmasi pendaftaran.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Format Email Tidak Valid",
        text: "Gunakan format email yang benar, contoh: nama@gmail.com",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    /* 🔥 FIX UTAMA: NOMOR HP WAJIB */
    if (!phone.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nomor HP belum diisi",
        text: "Nomor HP wajib diisi agar kami dapat menghubungi Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!isNumeric(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Nomor HP Tidak Valid",
        text: "Nomor HP hanya boleh berisi angka.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!batch) {
      Swal.fire({
        icon: "warning",
        title: "Batch belum dipilih",
        text: "Silakan pilih batch pelatihan.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const payload = {
      name,
      email,
      phone,
      trainingId: course.id,
      batch,
      notes,
      status: "pending",
    };

    try {
      await fetch("http://localhost:4000/api/training-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil 🎉",
        html: `
          <p>Terima kasih <b>${name}</b>,</p>
          <p>
            Anda berhasil mendaftar pelatihan
            <b>${course.title}</b>.
          </p>
          <p class="text-sm text-gray-500 mt-2">
            Tim PSTEAM akan menghubungi Anda melalui email atau nomor HP.
          </p>
        `,
        confirmButtonColor: "#16a34a",
      });

      onClose();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Pendaftaran",
        text: "Terjadi kesalahan pada server. Silakan coba lagi.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  /* =====================================================
     UI (TIDAK DIUBAH)
  ===================================================== */
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* HEADER IMAGE */}
        <div className="relative h-125 w-full bg-gray-200">
          <img
            src={thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE;
            }}
          />

          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="text-sm opacity-90">{course.category}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-5 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              placeholder="Nama Lengkap *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              placeholder="Email * (contoh: nama@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              placeholder="Nomor HP * (hanya angka)"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/[^0-9]/g, ""))
              }
            />

            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                         focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              {batchOptions.map((b: string, i: number) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                       focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Catatan tambahan (opsional)"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={submit}
              className="flex-1 bg-blue-700 hover:bg-blue-800
                         text-white font-semibold py-3 rounded-lg transition"
            >
              Daftar Sekarang
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300
                         text-gray-800 font-semibold py-3 rounded-lg transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
