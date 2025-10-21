"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "../../context/LocaleContext"; // ✅ gunakan context

interface Translation {
  title?: string;
}

export default function HeroSection() {
  const { locale } = useLocale(); // ambil locale dari context
  const [t, setT] = useState<Translation>({ title: "Loading..." });

  // Load JSON sesuai locale
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../../locales/${locale}/about/herosection.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan HeroSection:", err);
        setT({ title: "Loading..." });
      }
    };
    loadLocale();
  }, [locale]); // ⚡ otomatis jalan ulang saat locale berubah

  return (
    <div className="w-full flex justify-center py-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-[95%] md:w-[90%] lg:w-[85%] h-64 md:h-[24rem] rounded-3xl overflow-hidden shadow-lg"
      >
        {/* Background Image */}
        <Image
          src="/about/about2.png"
          alt={t.title || "Hero Image"}
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent"></div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            {t.title}
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
