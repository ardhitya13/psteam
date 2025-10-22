"use client";

import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocale } from "../context/LocaleContext";

interface Translation {
  title?: string;
  advisor?: string;
  program?: string;
  education?: string;
  specialization?: string;
  website?: string;
}

export default function TeamSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({});

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../locales/${locale}/team/projectcard.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan TeamSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      offset: 120,
    });
  }, []);

  // === Dosen ===
  const dosenList = [
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      role: t.advisor || "Advisor Lecturer",
      image: "/dosen/ari_wibowo.png",
      email: "ariwibowo@polibatam.ac.id",
      website: "https://ariwibowo.my.id",
      program: "Teknik Informatika",
      education:
        "Doktor (S3) Institut Teknologi Bandung - Teknik Elektro Informatika",
      specialization: "AI, Computer Vision, Autonomous System",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
    },
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      role: t.advisor || "Advisor Lecturer",
      image: "/dosen/swono_sibagariang.png",
      email: "swono@polibatam.ac.id",
      website: "https://swonosibagariang.my.id",
      program: "Teknik Informatika",
      education:
        "Magister (S2) Universitas Sumatera Utara - Ilmu dan Teknologi",
      specialization: "Software Development",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
    },
  ];

  // === Mahasiswa ===
  const mahasiswa = [
    {
      name: "Ardhitya Danur Siswondo",
      role: "Full Stack Developer",
      image: "/team/mahasiswa1.png",
      email: "ardhityasiswondo@gmail.com",
      website: "https://github.com/ardhitya13",
      github: "https://github.com/ardhitya13",
      linkedin:
        "https://www.linkedin.com/in/ardhitya-danur-siswondo-7361552b8/",
      facebook: "https://www.facebook.com/ardhitya.siswondo.3/",
      instagram: "https://www.instagram.com/ardhitya__/",
    },
    {
      name: "Arifah Husaini",
      role: "UI/UX Designer",
      image: "/team/mahasiswa2.png",
      email: "arifah@example.com",
      website: "#",
      github: "#",
      linkedin: "https://github.com/arifah336",
      facebook: "https://www.facebook.com/arifa.husain.921",
      instagram: "https://www.instagram.com/ripahusain_/",
    },
    {
      name: "Anggun Salsa Faradita",
      role: "UI/UX Designer",
      image: "/team/mahasiswa3.png",
      email: "anggunsalsa2807@gmail.com",
      website: "#",
      github: "https://github.com/anggun07",
      linkedin:
        "https://www.linkedin.com/in/anggun-salsa-faradita-13b0432b3/",
      facebook: "https://www.facebook.com/share/169XkGzGJo/",
      instagram: "https://www.instagram.com/anggunslsa_",
    },
    {
      name: "Farhan",
      role: "Backend Developer",
      image: "/team/mahasiswa4.png",
      email: "farhan@example.com",
      website: "#",
      github: "https://github.com/farhanrasyid20",
      linkedin: "https://www.linkedin.com/in/farhan-rasyid-88978a27a",
      facebook: "#",
      instagram: "https://www.instagram.com/frhanr20",
    },
  ];

  // === Social Icons ===
  const SocialIcons = ({ person }: { person: any }) => (
    <div className="flex justify-center gap-4 text-xl mt-5">
      <a href={person.github} target="_blank" className="text-gray-500 hover:text-black transition-all duration-300">
        <FaGithub />
      </a>
      <a href={person.linkedin} target="_blank" className="text-gray-500 hover:text-[#0a66c2] transition-all duration-300">
        <FaLinkedin />
      </a>
      <a href={person.facebook} target="_blank" className="text-gray-500 hover:text-[#1877f2] transition-all duration-300">
        <FaFacebook />
      </a>
      <a href={person.instagram} target="_blank" className="text-gray-500 hover:text-[#e4405f] transition-all duration-300">
        <FaInstagram />
      </a>
      <a href={person.website} target="_blank" className="text-gray-500 hover:text-green-600 transition-all duration-300">
        <FaGlobe />
      </a>
    </div>
  );

  // === Template Card (Force White) ===
  const renderCard = (person: any, index: number) => (
    <Card
      key={index}
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className="p-6 !bg-white !text-gray-800 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 rounded-2xl border border-gray-200 flex flex-col justify-between h-[460px] w-full max-w-sm"
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src={person.image}
          alt={person.name}
          width={160}
          height={160}
          className="rounded-full mb-4 object-cover border-4 border-gray-100 shadow-md"
        />
        <h3 className="text-lg font-semibold text-blue-900">{person.name}</h3>
        <p className="text-blue-600 font-medium">{person.role}</p>
        <p className="text-sm text-gray-700 mt-2">{person.email}</p>

        {person.program && (
          <div className="mt-4 text-gray-700 text-sm leading-relaxed text-left">
            <p>
              <span className="font-semibold text-blue-800">
                {t.program || "Program Studi"}:
              </span>{" "}
              {person.program}
            </p>
            <p>
              <span className="font-semibold text-blue-800">
                {t.education || "Pendidikan"}:
              </span>{" "}
              {person.education}
            </p>
            <p>
              <span className="font-semibold text-blue-800">
                {t.specialization || "Spesialis"}:
              </span>{" "}
              {person.specialization}
            </p>
          </div>
        )}

        <SocialIcons person={person} />
      </div>
    </Card>
  );

  // === Return Section ===
  return (
    <section id="team" className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold mb-12 text-blue-900"
        >
          {t.title || "PSTEAM Development Team"}
        </h2>

        {/* === Dosen === */}
        <div className="flex justify-center flex-wrap gap-8 mb-20">
          {dosenList.map((dosen, index) => renderCard(dosen, index))}
        </div>

        {/* === Mahasiswa === */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {mahasiswa.map((member, index) => renderCard(member, index))}
        </div>
      </div>
    </section>
  );
}
