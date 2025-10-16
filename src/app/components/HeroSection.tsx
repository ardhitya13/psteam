"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  const rotatingTexts: string[] = [
    "Membangun Teknologi Masa Depan, Hari Ini.",
    "Visi Anda, Kode Kami.",
    "Mengubah Kreativitas Menjadi Kekuatan Digital.",
    "PSTEAM adalah tim inovatif dari Jurusan Teknik Informatika Politeknik Negeri Batam yang berfokus pada pengembangan aplikasi web, mobile, IoT, AI, dan solusi digital masa depan.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section relative flex items-center justify-center overflow-hidden h-screen w-screen"
    >
      {/* === Video Background === */}
      <video
        src="/video/polibatam1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* === Overlay === */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* === Text Content === */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-2xl text-blue-400">
          POLIBATAM SOFTWARE TEAM
        </h1>

        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
            >
              {rotatingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
