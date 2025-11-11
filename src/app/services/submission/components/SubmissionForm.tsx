"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaWhatsapp } from "react-icons/fa";

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
    }, 1200);
  };

  // 🔹 Nomor WhatsApp PSTEAM (aktif)
  const whatsappNumber = "6281364440803";

  // 🔹 Buat pesan otomatis dengan data user
  const generateWhatsAppMessage = () => {
    const pesan = `Halo PSTEAM! 👋\n\nSaya ingin mengajukan proyek dengan detail berikut:\n\n📌 Nama: ${formData.nama}\n📧 Email: ${formData.email}\n📞 Telepon: ${formData.telepon}\n💼 Tipe Proyek: ${formData.tipeProyek}\n🧾 Judul: ${formData.judul}\n📝 Deskripsi: ${formData.deskripsi}\n\nTerima kasih! 🙏`;
    // ✅ Gunakan api.whatsapp.com agar tidak perlu simpan kontak
    return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(
      pesan
    )}&type=phone_number&app_absent=0`;
  };

  const handleBackToForm = () => {
    setSuccess(false);
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      tipeProyek: "",
      judul: "",
      deskripsi: "",
    });
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
      <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Formulir Pengajuan Proyek
      </h3>

      {/* ✅ Notifikasi Sukses */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-md animate-fadeIn z-10">
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow-lg text-center max-w-md">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-3 animate-bounce" />
            <h4 className="text-green-700 text-lg font-semibold">
              Pengajuan Berhasil Dikirim!
            </h4>
            <p className="text-gray-600 mt-1 mb-5">
              Tim PSTEAM akan meninjau dan menghubungi kamu melalui email atau WhatsApp.
            </p>

            {/* 🔹 Tombol WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaWhatsapp className="text-xl" />
                Hubungi via WhatsApp
              </a>

              {/* 🔹 Tombol Kembali */}
              <button
                onClick={handleBackToForm}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Kembali ke Form
              </button>
            </div>
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
            type="tel"
            name="telepon"
            placeholder="Nomor Telepon (WhatsApp)"
            value={formData.telepon}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none md:col-span-2 text-black placeholder:text-gray-500"
          />
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b pb-2">
          Detail Proyek
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="tipeProyek"
            value={formData.tipeProyek}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
          >
            <option value="">Pilih Tipe Proyek</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </select>

          <input
            type="text"
            name="judul"
            placeholder="Judul Proyek"
            value={formData.judul}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
          />
        </div>

        <textarea
          name="deskripsi"
          placeholder="Deskripsikan proyekmu secara singkat..."
          value={formData.deskripsi}
          onChange={handleChange}
          className="border border-gray-300 p-3 h-32 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-black"
        ></textarea>

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
