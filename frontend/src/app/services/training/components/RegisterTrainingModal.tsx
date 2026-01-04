"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DEFAULT_IMAGE = "/images/training-default.jpg";

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
     DATA
  ===================================================== */
  const thumbnail = course.img || DEFAULT_IMAGE;

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
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isNumeric = (value: string) =>
    /^[0-9]+$/.test(value);

  /* =====================================================
     SUBMIT
  ===================================================== */
  const submit = async () => {
    if (!name.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Nama wajib diisi",
        text: "Silakan masukkan nama lengkap Anda.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!email.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Email wajib diisi",
        text: "Email digunakan untuk konfirmasi pendaftaran.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!isValidEmail(email)) {
      await Swal.fire({
        icon: "warning",
        title: "Format email tidak valid",
        text: "Contoh format yang benar: nama@gmail.com",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!phone.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Nomor HP wajib diisi",
        text: "Nomor HP diperlukan untuk komunikasi.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (!isNumeric(phone)) {
      await Swal.fire({
        icon: "warning",
        title: "Nomor HP tidak valid",
        text: "Nomor HP hanya boleh berisi angka.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (notes.length > 300) {
      await Swal.fire({
        icon: "warning",
        title: "Catatan terlalu panjang",
        text: "Catatan maksimal 300 karakter.",
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

    /* ===== LOADING ===== */
    Swal.fire({
      title: "Mengirim pendaftaran...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(
        "http://localhost:4000/api/training-registrations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      await Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil 🎉",
        html: `
          <div style="text-align:left">
            <p><b>Nama:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Pelatihan:</b> ${course.title}</p>
            <p><b>Batch:</b> ${batch}</p>
            <p style="margin-top:8px;color:#6b7280;font-size:13px">
              Tim PSTEAM akan menghubungi Anda melalui email atau WhatsApp.
            </p>
          </div>
        `,
        confirmButtonColor: "#16a34a",
      });

      onClose();
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Gagal mengirim pendaftaran",
        text: "Terjadi kesalahan pada server. Silakan coba lagi.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden">

        {/* === SCROLL AREA (IMAGE + FORM JADI SATU) === */}
        <div className="max-h-[90vh] overflow-y-auto">

          {/* IMAGE */}
          <div className="relative w-full h-[240px] sm:h-[280px] bg-gray-200 overflow-hidden flex items-center justify-center">
            <img
              src={thumbnail}
              alt={course.title}
              className="max-w-full max-h-full object-contain object-center"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = DEFAULT_IMAGE)
              }
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-sm opacity-90">{course.category}</p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-6 space-y-5 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="Nama Lengkap *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600"
                placeholder="Nomor HP * (hanya angka)"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <select
                className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600"
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
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600"
              placeholder="Catatan tambahan (opsional)"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={submit}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg"
              >
                Daftar Sekarang
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
