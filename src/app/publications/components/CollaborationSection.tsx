"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext"; // ✅ gunakan locale

interface Translation {
  title?: string;
  paragraph?: string;
}

export default function CollaborationSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({
    title: "Kolaborasi",
    paragraph:
      "PSTEAM berkolaborasi dengan berbagai instansi, kampus, dan perusahaan teknologi dalam pengembangan produk digital, riset terapan, serta publikasi ilmiah di tingkat nasional dan internasional.",
  });

  // 🔁 Load JSON sesuai bahasa aktif
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/publications/collaborationsection.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan CollaborationSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10 px-6 md:px-16">
      {/* === Teks Kiri === */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-gray-700 order-2 md:order-1 space-y-4"
      >
        <h2 className="text-3xl font-bold text-blue-800">
          {t.title || "Kolaborasi"}
        </h2>
        <p className="text-lg leading-relaxed">{t.paragraph}</p>
      </motion.div>

      {/* === Gambar Kanan === */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-64 md:h-96 w-full relative order-1 md:order-2 group"
      >
        <Image
          src="/publications/publications3.png"
          alt="Collaboration"
          fill
          className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    </section>
  );
}
