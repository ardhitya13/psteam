"use client";

import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

export default function TataCaraPengajuan() {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        Tata Cara Pengajuan Proyek
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Ikuti langkah-langkah berikut sebelum mengajukan proyek kepada tim PSTEAM.
      </p>

      <ul className="space-y-3 text-gray-700 max-w-3xl mx-auto mb-8">
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-blue-600 mt-1" />
          <span>
            Pastikan ide proyek relevan dengan bidang <b>Web, Mobile, IoT</b>, atau <b>AI</b>.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-blue-600 mt-1" />
          <span>
            Siapkan deskripsi singkat berisi tujuan, manfaat, dan fitur utama dari proyek.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-blue-600 mt-1" />
          <span>
            Lengkapi form di bawah ini dengan data yang benar dan mudah dihubungi.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-blue-600 mt-1" />
          <span>
            Setelah dikirim, tim PSTEAM akan meninjau dan menghubungi kamu
            melalui email atau WhatsApp untuk tahap berikutnya.
          </span>
        </li>
      </ul>

      <div className="text-center">
        <a
          href="https://api.whatsapp.com/send/?phone=6281364440803&text=Halo%20PSTEAM%2C%20saya%20ingin%20bertanya%20tentang%20pengajuan%20proyek.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FaWhatsapp className="text-xl" />
          Hubungi Tim PSTEAM
        </a>
      </div>
    </section>
  );
}
