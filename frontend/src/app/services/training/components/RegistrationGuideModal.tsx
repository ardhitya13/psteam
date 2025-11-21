"use client";

import React, { useEffect, useState } from "react";
import { FaTimes, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegistrationGuideModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    if (open) setTimeout(() => setVisible(true), 100);
    else setVisible(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all duration-500 overflow-y-auto ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative bg-white rounded-2xl w-full max-w-3xl shadow-2xl p-8 border border-gray-100 transform transition-all duration-500 ease-out my-8
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"}
        `}
        /* batasi tinggi total modal agar tidak melebihi viewport, dan izinkan scroll internal */
        style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-500 hover:text-gray-800 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6" data-aos="fade-down">
          <h2 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-2">
            <FaClipboardList className="text-blue-700" /> Tata Cara Pendaftaran Pelatihan
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Ikuti langkah-langkah di bawah ini untuk mendaftar pelatihan dengan mudah.
          </p>
        </div>

        {/* Isi Langkah */}
        <div className="space-y-5" data-aos="fade-up">
          {/* 1 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">1️⃣ Pilih Pelatihan</h3>
            <p className="text-sm text-gray-600">
              Telusuri daftar pelatihan yang tersedia di halaman <b>Pelatihan & Sertifikasi</b>.
              Kamu bisa memfilter berdasarkan bidang seperti Web, Mobile, AI, dan lainnya.
            </p>
          </div>

          {/* 2 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">2️⃣ Klik Tombol “Daftar Sekarang”</h3>
            <p className="text-sm text-gray-600">
              Setelah menemukan pelatihan yang kamu minati, klik tombol <b>Daftar Sekarang</b> untuk membuka formulir pendaftaran.
            </p>
          </div>

          {/* 3 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">3️⃣ Isi Formulir Pendaftaran</h3>
            <p className="text-sm text-gray-600">
              Lengkapi data diri seperti nama lengkap, email, nomor telepon, kota, dan alasan mengikuti pelatihan.
              Pastikan semua data sudah benar sebelum mengirim.
            </p>
          </div>

          {/* 4 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">4️⃣ Kirim Formulir & Tunggu Konfirmasi</h3>
            <p className="text-sm text-gray-600">
              Setelah mengirim formulir, tim kami akan menghubungi kamu melalui email atau WhatsApp untuk 
              melakukan <b>konfirmasi pendaftaran dan pembayaran</b>.  
              Proses pembayaran dilakukan secara manual melalui rekening resmi yang akan diinformasikan oleh admin.
            </p>
          </div>

          {/* 5 */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 text-center shadow-sm">
            <FaCheckCircle className="text-green-600 text-3xl mx-auto mb-2" />
            <p className="text-gray-700 font-medium">
              Setelah konfirmasi dan pembayaran selesai, kamu akan resmi terdaftar sebagai peserta pelatihan 🎉
            </p>
          </div>
        </div>

        {/* Catatan */}
        <div className="mt-4 text-center text-gray-500 text-xs italic">
          *Pembayaran tidak dilakukan langsung di situs ini. Tim PSTeam akan memberikan panduan pembayaran resmi setelah kamu mendaftar.
        </div>

        {/* Tombol Tutup */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-6 py-2.5 rounded-full
            focus:outline-none select-none shadow-md hover:shadow-lg 
            transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
            [background-size:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%]"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
