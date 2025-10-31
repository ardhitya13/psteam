"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaLaptopCode, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    {
      title: "Ajukan Proyek",
      description:
        "Kembangkan proyek digital Anda bersama tim profesional kami. Mulai dari perencanaan hingga implementasi.",
      icon: <FaLaptopCode className="text-5xl text-[#60A5FA] mb-4" />,
      link: "/services/pengajuan",
      aos: "fade-right",
    },
    {
      title: "Pelatihan & Sertifikasi",
      description:
        "Ikuti pelatihan intensif di bidang Web, Mobile, IoT, dan AI. Dapatkan pengalaman praktis dan sertifikat.",
      icon: <FaChalkboardTeacher className="text-5xl text-[#4ADE80] mb-4" />,
      link: "/services/pelatihan",
      aos: "fade-left",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 text-center overflow-hidden"
    >
      {/* ✨ Background transparan agar mengikuti layout default */}
      <div className="absolute inset-0 bg-transparent backdrop-blur-[2px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* 🔹 Judul */}
        <h2
          data-aos="fade-down"
          className="text-4xl font-extrabold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          Pilih{" "}
          <span className="text-[#60A5FA] drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
            Layanan Kami
          </span>
        </h2>

        {/* 🔹 Deskripsi */}
        <p
          data-aos="fade-down"
          data-aos-delay="100"
          className="text-lg mb-12 text-gray-100 leading-relaxed max-w-3xl mx-auto"
        >
          Kami menawarkan layanan terbaik untuk membantu Anda dalam{" "}
          <span className="text-[#60A5FA] font-semibold">
            pengembangan proyek
          </span>{" "}
          dan{" "}
          <span className="text-[#60A5FA] font-semibold">
            peningkatan keterampilan digital
          </span>
          . Temukan layanan yang sesuai dengan kebutuhan Anda.
        </p>

        {/* 🔹 Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.link}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                data-aos={service.aos}
                data-aos-delay={index * 200}
                className="bg-white/90 text-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transition duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
