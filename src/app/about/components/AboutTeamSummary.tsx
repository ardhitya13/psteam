"use client";

import { motion } from "framer-motion";

export default function AboutTeamSummary() {
  return (
    <section className="relative bg-white text-gray-800 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* 🔹 Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-blue-800 mb-6"
        >
          Tim Kami
        </motion.h2>

        {/* 🔹 Paragraf deskripsi langsung tanpa const */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: `
              <span class='font-semibold text-black'>PSTEAM</span> terdiri dari mahasiswa dan dosen 
              <span class='font-medium text-gray-900'>Politeknik Negeri Batam</span> yang memiliki keahlian di bidang 
              <span class='font-medium text-blue-600'>Web</span>, 
              <span class='font-medium text-blue-600'>IoT</span>, 
              <span class='font-medium text-blue-600'>Mobile</span>, dan 
              <span class='font-medium text-blue-600'>Artificial Intelligence (AI)</span>. 
              Kami bekerja secara kolaboratif untuk menciptakan solusi digital terbaik yang berdampak nyata bagi masyarakat.
            `,
          }}
        />
      </div>

      {/* 🔹 Efek background lembut biru */}
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
