"use client";

import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaWhatsapp } from "react-icons/fa";

export default function FormPengajuan() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    title: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ============================
     HANDLE CHANGE (GLOBAL)
  ============================ */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // 🔥 KHUSUS PHONE → HANYA ANGKA
    if (name === "phone") {
      const onlyNumber = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, phone: onlyNumber }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================
     VALIDATORS
  ============================ */
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ============================
     SUBMIT FORM
  ============================ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Format email tidak valid. Contoh: nama@gmail.com");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Nomor telepon wajib diisi.");
      return;
    }

    if (!formData.projectType) {
      setError("Silakan pilih tipe proyek.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Judul proyek wajib diisi.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Deskripsi proyek wajib diisi.");
      return;
    }

    setSubmitted(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          projectTitle: formData.title,
          projectDescription: formData.description,
          projectType: formData.projectType,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim");

      setSuccess(true);
    } catch {
      setError("Gagal mengirim data ke server. Silakan coba lagi.");
    } finally {
      setSubmitted(false);
    }
  };

  const whatsappNumber = "6281364440803";

  const generateWhatsAppMessage = () => {
    const pesan = `Halo PSTEAM!

Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Tipe Proyek: ${formData.projectType}
Judul: ${formData.title}
Deskripsi: ${formData.description}`;

    return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(
      pesan
    )}`;
  };

  const handleBackToForm = () => {
    setSuccess(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      title: "",
      description: "",
    });
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative overflow-hidden">

      {/* SUCCESS */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center max-w-md">
            <FaCheckCircle className="text-green-600 text-5xl mx-auto mb-3" />
            <h4 className="text-green-700 text-lg font-semibold">
              Pengajuan Berhasil!
            </h4>
            <p className="text-gray-700 mb-5">
              Tim PSTEAM akan menghubungi kamu melalui email atau WhatsApp.
            </p>

            <div className="flex gap-3 justify-center">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>

              <button
                onClick={handleBackToForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center max-w-md">
            <FaExclamationCircle className="text-red-600 text-5xl mx-auto mb-3" />
            <p className="text-gray-800 font-medium">{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-gray-900 relative z-0"
      >
        <h4 className="text-lg font-semibold border-b border-gray-300 pb-2">
          Data Diri
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            className="bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
          />

          <input
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
          />

          {/* 🔥 PHONE FIX TOTAL */}
          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Nomor Telepon (hanya angka)"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
          />
        </div>

        <h4 className="text-lg font-semibold border-b border-gray-300 pb-2 mt-4">
          Detail Proyek
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="bg-white text-gray-900 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
          >
            <option value="">Pilih Tipe Proyek</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="IoT">IoT</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </select>

          <input
            name="title"
            placeholder="Judul Proyek"
            value={formData.title}
            onChange={handleChange}
            className="bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Deskripsikan proyekmu..."
          value={formData.description}
          onChange={handleChange}
          className="bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
        />

        <button
          type="submit"
          disabled={submitted}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {submitted ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </form>
    </section>
  );
}
