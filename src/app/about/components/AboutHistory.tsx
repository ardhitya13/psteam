"use client";

import { motion } from "framer-motion";

export default function AboutHistory() {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Judul animasi */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6"
        >
          Sejarah Kami
        </motion.h2>

        {/* Paragraf animasi */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          <span className="font-semibold text-black">PSTeam</span> berawal dari inisiatif
          kelompok mahasiswa Polibatam yang ingin mengembangkan proyek riset berbasis
          teknologi digital. Seiring waktu, PSTeam tumbuh menjadi tim profesional yang
          berpengalaman dalam berbagai proyek{" "}
          <span className="font-medium text-blue-600">Web</span>,{" "}
          <span className="font-medium text-blue-600">Mobile</span>,{" "}
          <span className="font-medium text-blue-600">IoT</span>, dan{" "}
          <span className="font-medium text-blue-600">AI</span>.
        </motion.p>
      </div>
    </section>
  );
}
