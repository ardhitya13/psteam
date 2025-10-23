"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "../../context/LocaleContext";

interface Translation {
  title?: string;
  paragraph?: string;
}

export default function AboutTeamSummary() {
  const { locale } = useLocale(); // Ambil locale dari context
  const [t, setT] = useState<Translation>({});

  // Load JSON sesuai locale
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/about/aboutteamsummary.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan AboutTeamSummary:", err);
      }
    };
    loadLocale();
  }, [locale]);

  return (
    <section className="relative bg-white text-gray-800 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-blue-800 mb-6"
        >
          {t.title || "Tim Kami"}
        </motion.h2>

        {/* Paragraf */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: t.paragraph || "" }}
        />
      </div>

      {/* Background efek lembut */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-blue-100 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
}
