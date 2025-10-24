"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "../../context/LocaleContext"; // ✅ gunakan context

interface Translation {
  title?: string;
  visionTitle?: string;
  visionText?: string;
  missionTitle?: string;
  missionPoints?: string[];
}

export default function AboutVisionMission() {
  const { locale } = useLocale(); // ambil locale langsung dari context
  const [t, setT] = useState<Translation>({
    missionPoints: [], // pastikan array selalu ada
  });

  // Load JSON sesuai locale
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/about/aboutvisionmission.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan AboutVisionMission:", err);
        setT({ missionPoints: [] });
      }
    };
    loadLocale();
  }, [locale]); // ⚡ useEffect akan berjalan ulang otomatis saat locale berubah

  return (
    <section className="bg-gray-50 text-gray-800 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Judul utama */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-blue-800 mb-12"
        >
          {t.title || "Loading..."}
        </motion.h2>

        {/* Vision & Mission side by side */}
        <div className="flex flex-col md:flex-row gap-10 text-left">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              {t.visionTitle || "Vision"}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t.visionText || "Loading..."}</p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              {t.missionTitle || "Mission"}
            </h3>
            {(t.missionPoints?.length || 0) > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {t.missionPoints!.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">Loading...</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
