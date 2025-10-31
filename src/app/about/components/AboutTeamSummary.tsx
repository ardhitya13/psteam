"use client";

import { motion } from "framer-motion";

export default function AboutTeamSummary() {
  return (
    <section
      className="relative text-white py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* 🔹 Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-md"
        >
          Tim Kami
        </motion.h2>

        {/* 🔹 Paragraf Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: `
              <span class='font-semibold text-[#60A5FA]'>PSTEAM</span> terdiri dari mahasiswa dan dosen 
              <span class='font-medium text-gray-100'>Politeknik Negeri Batam</span> yang memiliki keahlian di bidang 
              <span class='font-medium text-blue-300'>Web</span>, 
              <span class='font-medium text-blue-300'>IoT</span>, 
              <span class='font-medium text-blue-300'>Mobile</span>, dan 
              <span class='font-medium text-blue-300'>Artificial Intelligence (AI)</span>. 
              Kami bekerja secara kolaboratif untuk menciptakan solusi digital terbaik yang berdampak nyata bagi masyarakat.
            `,
          }}
        />
      </div>
    </section>
  );
}
