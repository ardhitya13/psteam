"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext";

interface Translation {
  title?: string;
  paragraph?: string;
}

export default function HeroSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({
    title: "Publikasi",
    paragraph:
      "PSTEAM berfokus pada pengembangan web, mobile, IoT, AI, dan riset inovatif di bidang teknologi informasi.",
  });

  // 🔁 Load JSON sesuai locale aktif
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/publications/herosection.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan HeroSection publikasi:", err);
      }
    };
    loadLocale();
  }, [locale]);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-blue-50 to-blue-100 py-24 text-center overflow-x-hidden overflow-y-hidden">
      {/* === Hero Content === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-6 box-border"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 drop-shadow-sm">
          {t.title || "Publikasi"}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          {t.paragraph ||
            "PSTEAM berfokus pada pengembangan teknologi inovatif di bidang web, mobile, IoT, dan AI."}
        </motion.p>
      </motion.div>
    </section>
  );
}
