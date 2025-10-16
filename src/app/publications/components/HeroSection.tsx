"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-64 md:h-[28rem] w-full"
      >
        <Image
          src="/publications/publications1.png"
          alt="PSTEAM Research Team"
          fill
          className="object-cover rounded-2xl shadow-xl"
        />
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 drop-shadow-sm">
            Publikasi
          </h1>
          <p className="text-lg md:text-xl text-black leading-relaxed opacity-90">
            Kolaborasi antara dosen dan mahasiswa untuk inovasi teknologi
          </p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true }}
        className="mt-6 text-center text-gray-700 text-lg max-w-3xl mx-auto"
      >
        <strong>PSTEAM</strong> berfokus pada pengembangan{" "}
        <em>web application</em>, <em>mobile app</em>, dan riset inovatif di
        bidang teknologi informasi.
      </motion.p>
    </section>
  );
}
