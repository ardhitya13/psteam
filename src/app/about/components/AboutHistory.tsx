"use client";

import { motion } from "framer-motion";

export default function AboutHistory() {
  return (
    <section className="bg-gray-50 text-gray-800 py-24 sm:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center flex flex-col items-center justify-center">
        {/* 🔹 Judul Section */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-blue-800 mb-10 tracking-wide"
        >
          Sejarah Kami
        </motion.h2>

        {/* 🔹 Paragraf Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl text-center md:text-justify indent-8"
          dangerouslySetInnerHTML={{
            __html: `
              <span class="font-semibold text-black">PSTEAM</span> berawal dari inisiatif kelompok mahasiswa 
              <span class="font-medium text-gray-900">Politeknik Negeri Batam</span> 
              yang ingin mengembangkan proyek riset berbasis teknologi digital. 
              Seiring waktu, PSTEAM tumbuh menjadi tim profesional yang berpengalaman dalam berbagai proyek 
              <span class="font-medium text-blue-600">Web</span>, 
              <span class="font-medium text-blue-600">Mobile</span>, 
              <span class="font-medium text-blue-600">IoT</span>, dan 
              <span class="font-medium text-blue-600">Artificial Intelligence (AI)</span>.
            `,
          }}
        />
      </div>

      {/* 🔹 Background lembut */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[750px] h-[750px] bg-blue-100 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
}
