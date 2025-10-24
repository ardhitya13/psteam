"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocale } from "../../context/LocaleContext";

export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  category?: "AI" | "Mobile" | "IoT" | "Web";
};

export type YearProjects = {
  year: number;
  projects: Project[];
};

const researchData: YearProjects[] = [
  {
    year: 2025,
    projects: [
      {
        title: "AI Chatbot",
        description:
          "Chatbot AI untuk interaksi pintar dengan kemampuan natural language processing",
        image:
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=2066&q=80",
        link: "/research/ai-chatbot",
        category: "AI",
      },
      {
        title: "IoT Smart Home",
        description:
          "Sistem rumah pintar dengan IoT untuk automasi dan kontrol perangkat",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2070&q=80",
        link: "/research/iot-smart-home",
        category: "IoT",
      },
      {
        title: "Mobile Learning App",
        description:
          "Aplikasi pembelajaran mobile interaktif dengan konten edukatif",
        image:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2070&q=80",
        link: "/research/mobile-learning-app",
        category: "Mobile",
      },
      {
        title: "Company Website",
        description:
          "Website profesional untuk perusahaan dengan desain modern",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
        link: "/research/company-website",
        category: "Web",
      },
    ],
  },
  {
    year: 2024,
    projects: [
      {
        title: "E-commerce Website",
        description:
          "Website toko online profesional dengan sistem pembayaran lengkap",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Web",
      },
      {
        title: "VR Simulation",
        description: "Simulasi VR untuk training dan edukasi di berbagai industri",
        image: "/research/research2.png",
        link: "#",
        category: "AI",
      },
      {
        title: "AI Recommendation System",
        description: "Sistem rekomendasi berbasis AI untuk personalisasi konten",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "AI",
      },
      {
        title: "Mobile Fitness App",
        description:
          "Aplikasi fitness dan kesehatan dengan tracking progress",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80",
        link: "#",
        category: "Mobile",
      },
    ],
  },
];

type CategoryType = "All" | "AI" | "Mobile" | "IoT" | "Web";

export default function ResearchSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<any>({});
  const data = researchData;

  const [activeYear, setActiveYear] = useState<number>(data[0]?.year || 2025);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // 🔁 Load locale translation
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/research/researchsection.json`
        );
        setT(module.default || module);
        setShowAll(false);
      } catch (err) {
        console.error("Gagal memuat terjemahan ResearchSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  const activeData = data.find((y) => y.year === activeYear);
  const filteredProjects = activeData?.projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects?.slice(0, 3);

  return (
    <section className="relative py-20 scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 -z-20"></div>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title || `Research Projects ${activeYear}`}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            {t.subtitle ||
              "Explore our latest research projects across different domains"}
          </p>
        </div>

        {/* Year Filter */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-10"
          data-aos="zoom-in"
        >
          {data.map((y) => (
            <button
              key={y.year}
              onClick={() => {
                setActiveYear(y.year);
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 min-w-[100px] ${
                activeYear === y.year
                  ? "bg-white text-blue-700 border-white scale-105 shadow-md"
                  : "bg-white/30 text-white border-white/40 hover:bg-white/50 hover:text-blue-700 hover:scale-105"
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-5 mb-12"
          data-aos="zoom-in"
        >
          {t.categories?.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 min-w-[130px] ${
                activeCategory === cat.id
                  ? "bg-white text-blue-700 border-white scale-105 shadow-md"
                  : "bg-white/30 text-white border-white/40 hover:bg-white/50 hover:text-blue-700 hover:scale-105"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects?.map((project, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100%"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white mb-4 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="inline-block w-full text-center font-bold py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
                >
                  {t.button || "Lihat Detail"}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {filteredProjects && filteredProjects.length > 3 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
            >
              {showAll ? (
                <>
                  <span>{t.button_less || "Sembunyikan"}</span>
                  <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                </>
              ) : (
                <>
                  <span>{t.button_more || "Lihat Lebih Banyak"}</span>
                  <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
