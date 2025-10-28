"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function TataCaraPengajuan() {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
        Tata Cara Pengajuan Proyek
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Ikuti langkah-langkah berikut sebelum mengajukan proyek kepada tim PSTEAM.
      </p>

      <ul className="space-y-3 text-gray-700 max-w-3xl mx-auto">
        <li className="flex items-start gap-3">
          <FaCheckCircle className="text-blue-600 mt-1" />
          <span>
            Pastikan ide proyek yang ingin diajukan relevan dengan bidang{" "}
            <b>Web, Mobile, IoT</b>, atau <b>Artificial Intelligence</b>.
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
            melalui email untuk tahap berikutnya.
          </span>
        </li>
      </ul>
    </section>
  );
}
