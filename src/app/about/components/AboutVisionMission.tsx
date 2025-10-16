"use client";

import { motion } from "framer-motion";

export default function AboutVisionMission() {
  return (
    <section className="bg-gray-50 text-gray-800 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-blue-700 mb-14"
        >
          Visi & Misi
        </motion.h2>

        {/* Konten */}
        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Visi */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Visi</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Menjadi tim pengembang digital yang unggul dalam inovasi teknologi dan
              solusi berbasis riset yang bermanfaat bagi masyarakat dan industri.
            </p>
          </motion.div>

          {/* Misi */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-3 text-blue-600">Misi</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Mengembangkan produk digital yang inovatif dan berkualitas.</li>
              <li>Mendorong kolaborasi antara mahasiswa dan industri.</li>
              <li>Mengimplementasikan teknologi modern yang solutif dan efisien.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
