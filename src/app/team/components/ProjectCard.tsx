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
import { useLocale } from "../../context/LocaleContext"; // ✅ Tambah LocaleContext

interface Translation {
  title?: string;
  advisor?: string;
  program?: string;
  education?: string;
  specialization?: string;
  website?: string;
}

const dosen = {
  name: "Swono Sibagariang, S.Kom., M.Kom",
  role: "Dosen Pembimbing",
  image: "/team/swono_sibagariang.png",
  email: "swono@polibatam.ac.id",
  website: "https://swonosibagariang.my.id",
  program: "Teknik Informatika",
  education: "Magister (S2)",
  specialization: "Software Development",
  github: "#",
  linkedin: "#",
  facebook: "#",
  instagram: "#",
};

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
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Anggun Salsa Faradita",
    role: "UI/UX Designer",
    image: "/team/mahasiswa3.png",
    email: "anggun@example.com",
    website: "#",
    github: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    name: "Farhan",
    role: "Backend Developer",
    image: "/team/mahasiswa4.png",
    email: "farhan@example.com",
    website: "#",
    github: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
];

export default function TeamSection() {
  const { locale } = useLocale(); // ✅ Ambil bahasa aktif
  const [t, setT] = useState<Translation>({});

  // ✅ Load file JSON sesuai bahasa
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../../locales/${locale}/team/projectcard.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan ProjectCard:", err);
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

  return (
    <section id="team" className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold mb-10 text-blue-900 drop-shadow-sm"
        >
          {t.title || "Tim Pengembang PSTEAM"}
        </h2>

        {/* === Dosen Pembimbing === */}
        <div data-aos="zoom-in" className="flex justify-center mb-16">
          <Card className="p-6 bg-blue-900/80 text-white shadow-xl hover:shadow-2xl w-80 transition-transform duration-300 hover:scale-105 rounded-2xl border border-blue-400/40 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <Image
                src={dosen.image}
                alt={dosen.name}
                width={160}
                height={160}
                className="rounded-full mb-4 object-cover aspect-square border-4 border-blue-400 shadow-md"
              />
              <h3 className="text-xl font-semibold text-white">
                {dosen.name}
              </h3>
              <p className="text-blue-200 font-medium">
                {t.advisor || dosen.role}
              </p>

              <p className="text-sm text-gray-200 mt-3">{dosen.email}</p>

              <a
                href={dosen.website}
                target="_blank"
                className="text-blue-300 flex items-center justify-center gap-2 mt-2 hover:text-blue-400 font-medium transition-colors"
              >
                <FaGlobe /> {t.website || "Personal Website"}
              </a>

              <div className="mt-4 text-gray-200 text-sm leading-relaxed text-left">
                <p>
                  <span className="font-semibold text-blue-300">
                    {t.program || "Program Studi"}:
                  </span>{" "}
                  {dosen.program}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">
                    {t.education || "Pendidikan"}:
                  </span>{" "}
                  {dosen.education}
                </p>
                <p>
                  <span className="font-semibold text-blue-300">
                    {t.specialization || "Spesialis"}:
                  </span>{" "}
                  {dosen.specialization}
                </p>
              </div>

              <div className="flex justify-center gap-4 text-xl text-blue-300 mt-4">
                <a href={dosen.github} target="_blank">
                  <FaGithub />
                </a>
                <a href={dosen.linkedin} target="_blank">
                  <FaLinkedin />
                </a>
                <a href={dosen.facebook} target="_blank">
                  <FaFacebook />
                </a>
                <a href={dosen.instagram} target="_blank">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* === Mahasiswa === */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mahasiswa.map((member, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="p-5 bg-blue-900/80 text-white shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 rounded-2xl border border-blue-400/40 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={140}
                  height={140}
                  className="rounded-full mb-3 object-cover aspect-square border-4 border-blue-400 shadow-md"
                />
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-blue-200">{member.role}</p>
                <p className="text-sm text-gray-200 mt-2">{member.email}</p>

                <a
                  href={member.website}
                  target="_blank"
                  className="text-blue-300 flex items-center justify-center gap-2 mt-2 hover:text-blue-400 transition-colors"
                >
                  <FaGlobe /> {t.website || "Personal Website"}
                </a>

                <div className="flex justify-center gap-4 text-xl text-blue-300 mt-4">
                  <a href={member.github}>
                    <FaGithub />
                  </a>
                  <a href={member.linkedin}>
                    <FaLinkedin />
                  </a>
                  <a href={member.facebook}>
                    <FaFacebook />
                  </a>
                  <a href={member.instagram}>
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
