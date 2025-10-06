"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const categories = [
    { id: "all", name: "Semua Layanan", icon: "🌐" },
    { id: "web", name: "Web", icon: "💻" },
    { id: "mobile", name: "Mobile", icon: "📱" },
    { id: "iot", name: "IoT", icon: "🔗" },
    { id: "ai", name: "AI", icon: "🤖" },
  ];

  const services = [
    {
      id: 1,
      title: "Website Perusahaan",
      category: "web",
      description:
        "Website profesional untuk perusahaan dengan desain modern dan responsif.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
      icon: "🏢",
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      category: "web",
      description:
        "Platform online shop lengkap dengan sistem pembayaran otomatis.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
      icon: "🛒",
    },
    {
      id: 3,
      title: "Custom Web Application",
      category: "web",
      description: "Aplikasi web custom sesuai kebutuhan bisnis Anda.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      icon: "⚙️",
    },
    {
      id: 4,
      title: "Android Apps",
      category: "mobile",
      description: "Aplikasi native Android dengan performa optimal.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
      icon: "🤖",
    },
    {
      id: 5,
      title: "iOS Apps",
      category: "mobile",
      description:
        "Aplikasi iOS elegan dengan performa tinggi untuk Apple ecosystem.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
      icon: "🍎",
    },
    {
      id: 6,
      title: "Cross-Platform Apps",
      category: "mobile",
      description:
        "Aplikasi berjalan di Android dan iOS hanya dengan satu codebase.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80",
      icon: "📲",
    },
    {
      id: 7,
      title: "Smart Home System",
      category: "iot",
      description:
        "Sistem automasi rumah pintar dengan kontrol penuh dari smartphone.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
      icon: "🏠",
    },
    {
      id: 8,
      title: "Industrial IoT",
      category: "iot",
      description:
        "Solusi IoT industri untuk memantau dan mengontrol mesin produksi secara real-time.",
      image:
        "https://images.unsplash.com/photo-1581094801216-6c88e7e742cc?auto=format&fit=crop&w=1000&q=80",
      icon: "🏭",
    },
    {
      id: 9,
      title: "Smart Agriculture",
      category: "iot",
      description:
        "Sistem IoT untuk pertanian modern dengan pemantauan otomatis.",
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80",
      icon: "🌱",
    },
    {
      id: 10,
      title: "Chatbot AI",
      category: "ai",
      description:
        "Chatbot cerdas untuk layanan pelanggan otomatis 24 jam nonstop.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80",
      icon: "💬",
    },
    {
      id: 11,
      title: "Predictive Analytics",
      category: "ai",
      description:
        "Analisis prediktif untuk pengambilan keputusan berbasis data.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      icon: "📊",
    },
    {
      id: 12,
      title: "Computer Vision",
      category: "ai",
      description:
        "Sistem pengenalan visual berbasis AI untuk automasi industri.",
      image:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1000&q=80",
      icon: "👁️",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 6);

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.icon : "🔹";
  };

  return (
    <section id="services" className="relative py-20 scroll-mt-20">
      {/* 🔵 Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-500 -z-20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 -z-10"
        style={{
          backgroundImage: "url('/servicesfoto/services1.png')",
          filter: "blur(4px)",
        }}
      ></div>

      {/* 🔹 Container */}
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Layanan & Solusi Digital
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Profesional dalam mengembangkan solusi digital modern untuk bisnis Anda.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mb-12" data-aos="zoom-in">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAll(false);
              }}
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

        {/* Info Label */}
        <div className="text-center mb-10" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 bg-white/30 text-white border-white/40 backdrop-blur-md">
            <span className="text-xl">{getCategoryIcon(activeCategory)}</span>
            <span>
              {activeCategory === "all" && "Menampilkan semua layanan"}
              {activeCategory === "web" && "Web Development Services"}
              {activeCategory === "mobile" && "Mobile Application Services"}
              {activeCategory === "iot" && "Internet of Things Solutions"}
              {activeCategory === "ai" && "Artificial Intelligence Services"}
            </span>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100%"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow">
                  {service.icon} {service.category.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white mb-4 leading-relaxed">
                  {service.description}
                </p>

                <Button
                  as={Link}
                  href={`/services/${service.category}/${service.id}`}
                  color="blue"
                  className="w-full font-bold py-3 rounded-lg bg-blue-700 hover:bg-blue-800 transition"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less Button */}
        {filteredServices.length > 6 && (
          <div className="text-center mt-10" data-aos="fade-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full bg-white/30 text-white font-semibold border border-white/50 hover:bg-white hover:text-blue-700 transition duration-300"
            >
              {showAll ? "Tampilkan Lebih Sedikit ⬆️" : "Lihat Semua Layanan ⬇️"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
