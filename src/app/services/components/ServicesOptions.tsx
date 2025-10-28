"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesOptions() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="service-options"
      className="relative py-20 text-gray-800"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,40,0.8), rgba(0,0,80,0.7)), url('/images/bg-service.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay gelap untuk efek kontras */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Konten utama */}
      <div className="relative max-w-5xl mx-auto px-6 text-center text-white" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          Pilih Cara Anda Memulai Bersama Kami
        </h2>
        <p className="text-gray-200 mb-12 max-w-2xl mx-auto">
          Ajukan ide proyek atau ikuti pelatihan profesional bersama tim PSTEAM untuk wujudkan inovasi digitalmu.
        </p>

        {/* Card Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pengajuan Proyek */}
          <div
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition transform hover:-translate-y-1"
            data-aos="zoom-in"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              🧩 Pengajuan Proyek
            </h3>
            <p className="text-gray-600 mb-6">
              Ajukan ide proyekmu ke tim PSTEAM. Kami bantu realisasikan dengan tim IT kami.
            </p>
            <button
              onClick={() => setShowProjectForm(true)}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ajukan
            </button>
          </div>

          {/* Pelatihan */}
          <div
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 transition transform hover:-translate-y-1"
            data-aos="zoom-in"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800">🎓 Pelatihan</h3>
            <p className="text-gray-600 mb-6">
              Ikuti program pelatihan berbasis IT untuk tingkatkan skill profesionalmu.
            </p>
            <button
              onClick={() => setShowTrainingForm(true)}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ajukan
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form Pengajuan Proyek */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative animate-fadeIn"
            data-aos="zoom-in"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Pengajuan Proyek
            </h3>

            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nama"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="No Telepon"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>Pilih Tipe Proyek</option>
                <option>Web</option>
                <option>IoT</option>
                <option>AI</option>
                <option>Mobile</option>
              </select>
              <input
                type="text"
                placeholder="Judul Proyek"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Deskripsi Proyek"
                className="border p-2 rounded-md h-24 focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </form>

            <button
              onClick={() => setShowProjectForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal Form Pengajuan Pelatihan */}
      {showTrainingForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative animate-fadeIn"
            data-aos="zoom-in"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Pengajuan Pelatihan
            </h3>

            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nama"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="No Telepon"
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>Pilih Tipe Pelatihan</option>
                <option>Web</option>
                <option>IoT</option>
                <option>AI</option>
                <option>Mobile</option>
              </select>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </form>

            <button
              onClick={() => setShowTrainingForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}