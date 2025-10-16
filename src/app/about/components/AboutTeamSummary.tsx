"use client";

import { motion } from "framer-motion";

export default function AboutTeamSummary() {
  return (
    <section className="relative bg-white text-gray-800 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Judul animasi halus */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6"
        >
          Tim Kami
        </motion.h2>

        {/* Paragraf dengan efek fade-up lembut */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          <span className="font-semibold text-black">PSTeam</span> terdiri dari mahasiswa
          dan dosen <span className="font-medium text-gray-900">Politeknik Negeri Batam</span> 
          yang memiliki keahlian di bidang{" "}
          <span className="font-medium text-blue-600">Web</span>,{" "}
          <span className="font-medium text-blue-600">IoT</span>,{" "}
          <span className="font-medium text-blue-600">Mobile</span>, dan{" "}
          <span className="font-medium text-blue-600">Artificial Intelligence (AI)</span>.{" "}
          Kami bekerja secara kolaboratif untuk menciptakan solusi digital terbaik yang 
          berdampak nyata bagi masyarakat.
        </motion.p>
      </div>

      {/* Background efek lembut dengan pergerakan halus */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-blue-100 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
}
