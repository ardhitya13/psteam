"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "../context/LocaleContext"; // import context

export default function HeroSection() {
  const { locale } = useLocale(); 
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [rotatingTexts, setRotatingTexts] = useState<string[]>([]);

  // Load JSON sesuai locale
  useEffect(() => {
    if (!locale) return; // guard jika locale belum siap

    const loadTexts = async () => {
      try {
        const module = await import(`../locales/${locale}/herosection.json`);
        setRotatingTexts(module.default || module);
        setCurrentTextIndex(0);
      } catch (err) {
        console.error("Gagal memuat teks HeroSection:", err);
        setRotatingTexts([]);
      }
    };
    loadTexts();
  }, [locale]);

  // Rotating text
  useEffect(() => {
    if (rotatingTexts.length === 0) return; // jangan set interval kalau teks kosong

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rotatingTexts]);

  return (
    <section
      id="hero"
      className="hero-section relative flex items-center justify-center overflow-hidden h-screen w-screen"
    >
      {/* Video Background */}
      <video src="/video/polibatam1.mp4" autoPlay loop muted playsInline />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Text Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-2xl text-blue-800">
          POLIBATAM SOFTWARE TEAM
        </h1>

        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {rotatingTexts.length > 0 && (
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
