"use client";

import { motion } from "framer-motion";

export default function NewsSection() {
  const newsList = [
    {
      title: "PSTEAM Rilis Aplikasi Akademik Terintegrasi",
      desc: "Tim PSTEAM mengembangkan aplikasi akademik berbasis web untuk mendukung kegiatan perkuliahan dan administrasi kampus secara efisien.",
      date: "September 2025",
    },
    {
      title: "Workshop UI/UX Design untuk Mahasiswa Informatika",
      desc: "Kegiatan ini diadakan untuk meningkatkan pemahaman desain antarmuka modern dan prinsip user-centered design.",
      date: "Agustus 2025",
    },
  ];

  return (
    <section className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-8 text-[#1e376c] text-center"
      >
        Sekilas Berita PSTEAM
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsList.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-[#1e376c] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-3">{item.desc}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
