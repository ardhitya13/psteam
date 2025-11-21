"use client";

import { motion } from "framer-motion";

export default function AboutHistory() {
  // ✅ Fungsi highlight agar semua "PSTeam" seragam gaya
  const highlightPSTEAM = (text: string) => {
    return text.replace(
      /(PSTeam|PSTEAM|Psteam)/gi,
      `<strong class="text-[#60A5FA] font-bold">$1</strong>` // biru muda agar kontras di bg gelap
    );
  };

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28 text-white"
    >
      <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center flex flex-col items-center justify-center">
        {/* 🔹 Judul Section */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-white mb-10 tracking-wide drop-shadow-lg"
        >
          Sejarah Kami
        </motion.h2>

        {/* 🔹 Paragraf Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-4xl text-center md:text-justify indent-8"
          dangerouslySetInnerHTML={{
            __html: highlightPSTEAM(`
              PSTeam berawal dari inisiatif kelompok mahasiswa 
              <span class="font-medium text-gray-100">Politeknik Negeri Batam</span> 
              yang ingin mengembangkan proyek riset berbasis teknologi digital. 
              Seiring waktu, PSTeam tumbuh menjadi tim profesional yang berpengalaman dalam berbagai proyek 
              <span class="font-medium text-blue-300">Web</span>, 
              <span class="font-medium text-blue-300">Mobile</span>, 
              <span class="font-medium text-blue-300">IoT</span>, dan 
              <span class="font-medium text-blue-300">Artificial Intelligence (AI)</span>.
            `),
          }}
        />
      </div>
    </section>
  );
}
