"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const categories = [
    { id: "all", name: "Semua Proyek", icon: "🌐" },
    { id: "web", name: "Web", icon: "💻" },
    { id: "mobile", name: "Mobile", icon: "📱" },
    { id: "iot", name: "IoT", icon: "🔗" },
    { id: "ai", name: "AI", icon: "🤖" },
  ];

  const projects = [
    {
      id: 1,
      title: "Website Perusahaan",
      category: "web",
      description:
        "Website profesional dengan desain modern dan UI responsif untuk branding bisnis.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
      icon: "🏢",
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      category: "web",
      description:
        "Sistem belanja online lengkap dengan pembayaran otomatis dan dashboard admin.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
      icon: "🛒",
    },
    {
      id: 3,
      title: "AI Chatbot",
      category: "ai",
      description:
        "Chatbot cerdas yang dapat membantu pelanggan secara otomatis 24/7.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80",
      icon: "💬",
    },
    {
      id: 4,
      title: "Smart Home IoT",
      category: "iot",
      description:
        "Sistem rumah pintar yang dapat dikontrol dari smartphone dengan sensor otomatis.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
      icon: "🏠",
    },
    {
      id: 5,
      title: "Cross Platform Apps",
      category: "mobile",
      description:
        "Aplikasi multiplatform untuk Android dan iOS dengan satu codebase efisien.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80",
      icon: "📲",
    },
    {
      id: 6,
      title: "AI Predictive Analytics",
      category: "ai",
      description:
        "Analisis data cerdas berbasis AI untuk memprediksi tren dan keputusan bisnis.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      icon: "📊",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background Parallax */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-25 -z-10"
        style={{
          backgroundImage: "url('/projects/projects1.png')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 -z-20"></div>

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Proyek & Solusi Digital
          </h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Kami mengembangkan berbagai proyek IT inovatif untuk membantu bisnis dan institusi berkembang di era digital.
          </p>
          <div className="w-24 h-1 bg-white mx-auto mt-6"></div>
        </div>

        {/* Category Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-aos="zoom-in"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-full border font-semibold transition-all duration-300 
                ${
                  activeCategory === cat.id
                    ? "bg-white text-blue-700 border-white scale-105 shadow-md"
                    : "bg-white/20 text-white border-white/40 hover:bg-white/40 hover:text-blue-700 hover:scale-105"
                }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white/15 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100%"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">
                  {project.icon} {project.category.toUpperCase()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-blue-100 mb-4">{project.description}</p>

                <Button
                  as={Link}
                  href={`/projects/${project.category}/${project.id}`}
                  color="blue"
                  className="w-full bg-blue-600 hover:bg-blue-700 font-semibold rounded-md transition-all"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-12" data-aos="fade-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-white/20 text-white font-semibold border border-white/50 hover:bg-white hover:text-blue-700 transition duration-300"
            >
              {showAll ? "Tampilkan Lebih Sedikit ⬆️" : "Lihat Semua Proyek ⬇️"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
