"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function FormPengajuan() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    tipeProyek: "",
    judul: "",
    deskripsi: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nama ||
      !formData.email ||
      !formData.telepon ||
      !formData.tipeProyek ||
      !formData.judul ||
      !formData.deskripsi
    ) {
      setError("Semua field wajib diisi dengan benar!");
      setSuccess(false);
      return;
    }

    setError("");
    setSubmitted(true);

    setTimeout(() => {
      setSuccess(true);
      setSubmitted(false);
      setFormData({
        nama: "",
        email: "",
        telepon: "",
        tipeProyek: "",
        judul: "",
        deskripsi: "",
      });

      // Hilangkan pesan sukses setelah 3 detik
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Formulir Pengajuan Proyek
      </h3>

      {/* ✅ Notifikasi Sukses */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md animate-fadeIn z-10">
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow-lg text-center">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-3 animate-bounce" />
            <h4 className="text-green-700 text-lg font-semibold">
              Pengajuan Berhasil Dikirim!
            </h4>
            <p className="text-gray-600 mt-1">
              Tim PSTEAM akan meninjau dan menghubungi kamu melalui email.
            </p>
          </div>
        </div>
      )}

      {/* ⚠️ Notifikasi Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md animate-fadeIn z-10">
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow-lg text-center">
            <FaExclamationCircle className="text-red-600 text-5xl mx-auto mb-3 animate-pulse" />
            <h4 className="text-red-700 text-lg font-semibold">Gagal Mengirim!</h4>
            <p className="text-gray-600 mt-1">{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-gray-900 relative z-0"
      >
        {/* 🔹 Data Diri */}
        <h4 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
          Data Diri
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black placeholder:text-gray-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black placeholder:text-gray-500"
          />
          <input
            type="text"
            name="telepon"
            placeholder="Nomor Telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none md:col-span-2 text-black placeholder:text-gray-500"
          />
        </div>

        {/* 🔹 Detail Proyek */}
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b pb-2">
          Detail Proyek
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="tipeProyek"
            value={formData.tipeProyek}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black placeholder:text-gray-500"
          >
            <option value="">Pilih Tipe Proyek</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Internet of Things (IoT)">
              Internet of Things (IoT)
            </option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
          </select>

          <input
            type="text"
            name="judul"
            placeholder="Judul Proyek"
            value={formData.judul}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black placeholder:text-gray-500"
          />
        </div>

        <textarea
          name="deskripsi"
          placeholder="Deskripsikan proyekmu secara singkat..."
          value={formData.deskripsi}
          onChange={handleChange}
          className="border border-gray-300 p-3 h-32 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-black placeholder:text-gray-500"
        ></textarea>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={submitted}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md
            ${
              submitted
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
        >
          {submitted ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </form>
    </section>
  );
}
