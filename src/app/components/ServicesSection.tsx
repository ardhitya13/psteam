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
      icon: <FaLaptopCode className="text-5xl text-blue-600 mb-4" />,
      link: "/services/pengajuan",
      aos: "fade-right", // ⬅️ efek masuk dari kanan
    },
    {
      title: "Pelatihan & Sertifikasi",
      description:
        "Ikuti pelatihan intensif di bidang Web, Mobile, IoT, dan AI. Dapatkan pengalaman praktis dan sertifikat.",
      icon: <FaChalkboardTeacher className="text-5xl text-green-600 mb-4" />,
      link: "/services/pelatihan",
      aos: "fade-left", // ⬅️ efek masuk dari kiri
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-r bg-white text-black relative overflow-hidden"
    >
      {/* 🔹 Background blur effect */}
      <div className="absolute inset-0 bg-[url('/servicesfoto/services1.png')] bg-cover bg-center opacity-20 blur-sm -z-10"></div>

      <div className="max-w-6xl mx-auto text-center px-6">
        <h2
          data-aos="fade-down" // ⬅️ judul muncul dari atas
          className="text-4xl font-bold mb-6 text-blue-800 drop-shadow-lg"
        >
          Pilih Layanan Kami
        </h2>
        <p
          data-aos="fade-down"
          data-aos-delay="100"
          className="text-lg mb-12 opacity-90"
        >
          Kami menawarkan layanan terbaik untuk membantu Anda dalam pengembangan
          proyek dan peningkatan keterampilan digital.
        </p>

        {/* 🔹 Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.link}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                data-aos={service.aos} // ✅ animasi AOS beda tiap card
                data-aos-delay={index * 200}
                className="bg-white text-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transition duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
