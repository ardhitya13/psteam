"use client";

import { motion } from "framer-motion";

export default function AboutVisionMission() {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul utama */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12"
        >
          Visi & Misi
        </motion.h2>

        {/* Visi & Misi side by side */}
        <div className="flex flex-col md:flex-row gap-10 text-left">
          {/* === VISI === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi tim pengembang digital yang unggul dalam inovasi teknologi
              dan solusi berbasis riset yang bermanfaat bagi masyarakat dan
              industri.
            </p>
          </motion.div>

          {/* === MISI === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Misi</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Mengembangkan produk digital yang inovatif dan berkualitas.</li>
              <li>Mendorong kolaborasi antara mahasiswa dan industri.</li>
              <li>
                Mengimplementasikan teknologi modern yang solutif dan efisien.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
