"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "../../context/LocaleContext";

interface Translation {
  title?: string;
  paragraph?: string;
}

export default function AboutHistory() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({});

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../../locales/${locale}/about/abouthistory.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan AboutHistory:", err);
      }
    };
    loadLocale();
  }, [locale]);

  return (
    <section className="bg-gray-50 text-gray-800 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6"
        >
          {t.title || "Sejarah Kami"}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: t.paragraph || "" }}
        />
      </div>
    </section>
  );
}
