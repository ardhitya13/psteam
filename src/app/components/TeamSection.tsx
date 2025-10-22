"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocale } from "../context/LocaleContext"; // ✅ Tambahkan Locale Context

interface Translation {
  title?: string;
  role?: string;
}

export default function StudentsCard() {
  const { locale } = useLocale(); // ✅ Ambil locale aktif
  const [t, setT] = useState<Translation>({});

  // ✅ Load JSON sesuai locale
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../../locales/${locale}/team/studentscard.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan StudentsCard:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // ✅ Inisialisasi animasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });
  }, []);

  const mahasiswaList = [
    {
      name: "Ardhitya Danur Siswondo",
      role: t.role || "Production Team of PSTeam",
      email: "ardhityasiswondo@gmail.com",
      image: "/team/mahasiswa1.png",
      github: "https://github.com/ardhitya13",
      linkedin: "https://www.linkedin.com/in/ardhitya-danur-siswondo-7361552b8/",
      facebook: "https://www.facebook.com/ardhitya.siswondo.3/",
      instagram: "https://www.instagram.com/ardhitya__/",
      website: "https://ardhitya13.github.io/"
    },
    {
      name: "Arifah Husaini",
      role: t.role || "Production Team of PSTeam",
      email: "arifah@example.com",
      image: "/team/mahasiswa2.png",
      github: "#",
      linkedin: "#",
      facebook: "#",
      instagram: "#",
      website: "#"
    },
    {
      name: "Anggun Salsa Faradita",
      role: t.role || "Production Team of PSTeam",
      email: "anggunsalsa2807@gmail.com",
      image: "/team/mahasiswa3.png",
      github: "https://github.com/anggun07",
      linkedin: "https://www.linkedin.com/in/anggun-salsa-faradita-13b0432b3/",
      facebook: "https://www.facebook.com/share/169XkGzGJo/",
      instagram: "https://www.instagram.com/anggunslsa_",
      website: "#"
    },
    {
      name: "Farhan",
      role: t.role || "Production Team of PSTeam",
      email: "farhan@example.com",
      image: "/team/mahasiswa4.png",
      github: "https://github.com/farhanrasyid20",
      linkedin: "https://www.linkedin.com/in/farhan-rasyid-88978a27a",
      facebook: "#",
      instagram: "https://www.instagram.com/frhanr20",
      website: "#"
    },
  ];

  return (
    <section
      className="py-16 px-6 text-center"
      id="mahasiswa"
      style={{ backgroundColor: "#57c9e8" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-white mb-10 drop-shadow-lg"
        >
          {t.title || "Mahasiswa PSTeam"}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mahasiswaList.map((mhs, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-white/90 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 mb-4 overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image
                    src={mhs.image}
                    alt={mhs.name}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {mhs.name}
                </h3>
                <p className="text-sm text-gray-700">{mhs.role}</p>
                <a
                  href={`mailto:${mhs.email}`}
                  className="text-sm text-gray-500 mb-3 hover:text-blue-700 transition"
                >
                  {mhs.email}
                </a>

                {/* Ikon Sosial Media */}
                <div className="flex gap-4 text-gray-700 mt-2">
                  <a href={mhs.github} target="_blank" className="hover:text-black transition-colors">
                    <BsGithub size={20} />
                  </a>
                  <a href={mhs.linkedin} target="_blank" className="hover:text-blue-700 transition-colors">
                    <BsLinkedin size={20} />
                  </a>
                  <a href={mhs.facebook} target="_blank" className="hover:text-blue-600 transition-colors">
                    <BsFacebook size={20} />
                  </a>
                  <a href={mhs.instagram} target="_blank" className="hover:text-pink-600 transition-colors">
                    <BsInstagram size={20} />
                  </a>
                  <a href={mhs.website} target="_blank" className="hover:text-green-700 transition-colors">
                    <FaGlobe size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
