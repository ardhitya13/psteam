"use client";

import Image from "next/image";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext";
import AOS from "aos";
import "aos/dist/aos.css";

interface Translation {
  title?: string;
  program?: string;
  email?: string;
  educationHistory?: string;
  specialization?: string;
}

export default function DosenSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({});

  // ✅ Load JSON terjemahan
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/team/dosencard.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan DosenCard:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // ✅ Efek Scroll sama seperti TeamSection
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      offset: 120,
    });
  }, []);

  const dosenList = [
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      title: t.title || "Dosen",
      prodi: "Teknologi Rekayasa Multimedia",
      pendidikan:
        "Doktor (S3) - Teknik Elektro Informatika, Institut Teknologi Bandung",
      email: "wibowo@polibatam.ac.id",
      riwayat: [
        "Sarjana (S1) Institut Teknologi Bandung - Teknik Informatika",
        "Magister (S2) Institut Teknologi Bandung - Informatika",
        "Doktor (S3) Institut Teknologi Bandung - Teknik Elektro Informatika",
      ],
      spesialis: "AI, Computer Vision, Autonomous System",
      image: "/dosen/ari_wibowo.png",
      socials: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      title: t.title || "Dosen",
      prodi: "Teknik Informatika",
      pendidikan:
        "Magister (S2) - Ilmu dan Teknologi, Universitas Sumatera Utara",
      email: "swono@polibatam.ac.id",
      riwayat: [
        "Sarjana (S1) Universitas Katolik Santo Thomas Sumatera Utara - Teknik Informatika",
        "Magister (S2) Universitas Sumatera Utara - Ilmu dan Teknologi",
      ],
      spesialis: "Software Development",
      image: "/dosen/swono_sibagariang.png",
      socials: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
      },
    },
  ];

  return (
    <section className="py-12 bg-gray-50" id="dosen">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl font-bold text-blue-800 mb-10"
        >
          {t.title || "Dosen Pembimbing"}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 justify-items-center">
          {dosenList.map((dosen, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 flex flex-col items-center text-center"
            >
              {/* Foto Dosen (bulat sempurna + efek hover halus) */}
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={dosen.image}
                  alt={dosen.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-semibold text-blue-900">
                {dosen.name}
              </h3>
              <p className="text-blue-600 font-medium">{dosen.title}</p>

              <p className="text-sm text-gray-700 mt-2">
                <strong>{t.program || "Program Studi"}:</strong> {dosen.prodi}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>{t.email || "Email"}:</strong> {dosen.email}
              </p>

              <div className="mt-4 text-gray-700 text-sm leading-relaxed text-left">
                <p>
                  <span className="font-semibold text-blue-800">
                    {t.educationHistory || "Riwayat Pendidikan"}:
                  </span>
                </p>
                <ul className="list-disc list-inside mt-1">
                  {dosen.riwayat.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
                <p className="mt-2">
                  <span className="font-semibold text-blue-800">
                    {t.specialization || "Bidang Spesialis"}:
                  </span>{" "}
                  {dosen.spesialis}
                </p>
              </div>

              {/* === Ikon Sosial Media === */}
              <div className="flex justify-center gap-4 text-xl mt-5">
                <a
                  href={dosen.socials.github}
                  target="_blank"
                  className="text-gray-500 hover:text-black transition-all duration-300"
                >
                  <BsGithub />
                </a>
                <a
                  href={dosen.socials.linkedin}
                  target="_blank"
                  className="text-gray-500 hover:text-[#0a66c2] transition-all duration-300"
                >
                  <BsLinkedin />
                </a>
                <a
                  href={dosen.socials.facebook}
                  target="_blank"
                  className="text-gray-500 hover:text-[#1877f2] transition-all duration-300"
                >
                  <BsFacebook />
                </a>
                <a
                  href={dosen.socials.instagram}
                  target="_blank"
                  className="text-gray-500 hover:text-[#e4405f] transition-all duration-300"
                >
                  <BsInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
