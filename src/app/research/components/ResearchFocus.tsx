"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext"; // ✅ hanya dua titik
import { FaLaptopCode, FaMobileAlt, FaRobot, FaNetworkWired } from "react-icons/fa";

interface FocusItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Translation {
  title?: string;
  focuses?: { title: string; desc: string }[];
}

export default function ResearchFocus() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({ focuses: [] });

  // 🔁 Load data sesuai bahasa aktif
  useEffect(() => {
    const loadLocale = async () => {
      try {
        // ✅ Struktur path sesuai permintaan kamu
        const module = await import(`../../locales/${locale}/research/researchfocus.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan ResearchFocus:", err);
        setT({ focuses: [] });
      }
    };
    loadLocale();
  }, [locale]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const icons = [<FaLaptopCode />, <FaMobileAlt />, <FaRobot />, <FaNetworkWired />];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2
        className="text-3xl md:text-4xl font-bold text-blue-700 mb-10"
        data-aos="fade-up"
      >
        {t.title || "Fokus Penelitian"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {t.focuses?.length ? (
          t.focuses.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition duration-300 border border-gray-100"
              data-aos="zoom-in"
              data-aos-delay={i * 150}
            >
              <div className="text-4xl text-blue-700 mb-4 flex justify-center">
                {icons[i]}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </section>
  );
}
