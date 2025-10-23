"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext"; // ✅ ambil bahasa aktif

interface Translation {
  title?: string;
  paragraph?: string;
}

export default function ResearchSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({
    title: "Riset dan Pengembangan",
    paragraph:
      "Tim PSTEAM secara aktif melakukan penelitian di bidang software engineering, UI/UX, machine learning, dan pengembangan sistem informasi yang berorientasi pada kebutuhan industri dan masyarakat.",
  });

  // 🔁 Load JSON sesuai bahasa aktif
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/publications/researchsection.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan ResearchSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10 px-6 md:px-16">
      {/* === Gambar kiri === */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-64 md:h-96 w-full relative group"
      >
        <Image
          src="/publications/publications2.png"
          alt="Project Development"
          fill
          className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>

      {/* === Teks kanan === */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-gray-700 space-y-4"
      >
        <h2 className="text-3xl font-bold text-blue-800">
          {t.title || "Riset dan Pengembangan"}
        </h2>
        <p className="text-lg leading-relaxed">{t.paragraph}</p>
      </motion.div>
    </section>
  );
}
