"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroProjectsSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-64 md:h-[28rem] w-full"
      >
        {/* Background Image */}
        <Image
          src="/projects/projects1.png"
          alt="PSTEAM Projects"
          fill
          priority
          className="object-cover rounded-2xl shadow-xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-blue-200 drop-shadow-lg">
            Proyek Digital Kami
          </h1>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
            Eksplorasi berbagai proyek inovatif dari PSTEAM —
            mencakup web, mobile, IoT, dan AI.
          </p>
        </motion.div>
      </motion.div>

      {/* Description below the banner */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true }}
        className="mt-6 text-center text-gray-700 text-lg max-w-3xl mx-auto px-4"
      >
        Kami berkomitmen menghadirkan solusi digital modern untuk mendukung
        kebutuhan industri, pendidikan, dan masyarakat. Setiap proyek dirancang
        dengan kualitas dan inovasi tinggi oleh tim profesional PSTEAM.
      </motion.p>
    </section>
  );
}
