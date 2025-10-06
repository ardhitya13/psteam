"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { YearProjects } from "../data/researchData";

type Props = {
  data: YearProjects[];
};

const categories = [
  { id: "All", name: "Semua Kategori", icon: "🌐" },
  { id: "Web", name: "Web", icon: "💻" },
  { id: "Mobile", name: "Mobile", icon: "📱" },
  { id: "IoT", name: "IoT", icon: "🔗" },
  { id: "AI", name: "AI", icon: "🤖" },
] as const;

type CategoryType = typeof categories[number]["id"];

export default function ResearchSection({ data }: Props) {
  const [activeYear, setActiveYear] = useState<number>(data[0]?.year || 2025);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const activeData = data.find((y) => y.year === activeYear);
  const filteredProjects = activeData?.projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const getCategoryIcon = (cat: string) => {
    const found = categories.find((c) => c.id === cat);
    return found ? found.icon : "🔹";
  };

  return (
    <section className="relative py-20 scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 -z-20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 -z-10"
        style={{ backgroundImage: "url('/research/research1.png')", filter: "blur(4px)" }}
      ></div>

      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Research Projects {activeYear}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Explore our latest research projects across different domains
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10" data-aos="zoom-in">
          {data.map((y) => (
            <button
              key={y.year}
              onClick={() => setActiveYear(y.year)}
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
        <div className="flex flex-wrap justify-center gap-5 mb-12" data-aos="zoom-in">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-300 min-w-[130px]
                ${
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

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100%"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">
                  {getCategoryIcon(project.category || "All")} {project.category || "All"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white mb-4 leading-relaxed">{project.description}</p>

                <a
                  href={project.link}
                  className="inline-block w-full text-center font-bold py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
