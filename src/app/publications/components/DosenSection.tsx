"use client";

import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaFilePdf,
} from "react-icons/fa";

type Publication = {
  title: string;
  link: string;
  date?: string; // ISO or yyyy-mm-dd
};

type Dosen = {
  name: string;
  position: string;
  program: string;
  email: string;
  education?: string[]; // riwayat pendidikan
  specialization?: string;
  image: string; // path under /public
  socials?: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  publications: Publication[];
};

export default function DosenSection() {
  const dosenList: Dosen[] = [
    {
      name: "Dr. Ari Wibowo, S.T., M.T.",
      position: "Dosen",
      program: "Teknologi Rekayasa Multimedia",
      email: "wibowo@polibatam.ac.id",
      education: [
        "S1: Institut Teknologi Bandung - Teknik Informatika",
        "S2: Institut Teknologi Bandung - Informatika",
        "S3: Institut Teknologi Bandung - Teknik Elektro Informatika",
      ],
      specialization: "AI, Computer Vision, Autonomous System",
      image: "/dosen/ari_wibowo.png", // taruh file di public/dosen/
      socials: {
        github: "#",
        linkedin: "#",
        facebook: "#",
        instagram: "#",
      },
      publications: [
        {
          title:
            "C2C marketplace model in fishery product trading application using SMS gateway",
          link:
            "https://www.matec-conferences.org/articles/matecconf/pdf/2018/56/matecconf_aasec2018_15001.pdf",
          date: "2018-11-01",
        },
        {
          title:
            "Object detection in dense and mixed traffic for autonomous vehicles with modified yolo",
          link:
            "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10325498",
          date: "2023-11-21",
        },
      ],
    },
    {
      name: "Swono Sibagariang, S.Kom., M.Kom",
      position: "Dosen",
      program: "Teknik Informatika",
      email: "swono@polibatam.ac.id",
      education: [
        "S1: Universitas Katolik Santo Thomas Sumatera Utara - Teknik Informatika",
        "S2: Universitas Sumatera Utara - Ilmu dan Teknologi",
      ],
      specialization: "Software Development",
      image: "/dosen/swono_sibagariang.png", // taruh file di public/dosen/
      socials: {
        github: "https://github.com/swonosib",
        linkedin: "https://linkedin.com/in/swonosib",
        facebook: "#",
        instagram: "#",
      },
      publications: [
        {
          title: "Prediksi Prospek Kerja Alumni Dengan Algoritma Neural Network",
          link:
            "https://d1wqtxts1xzle7.cloudfront.net/100597363/pdf-libre.pdf?1680482115=&response-content-disposition=inline%3B+filename%3DPrediksi_Prospek_Kerja_Alumni_Dengan_Alg.pdf",
          date: "2023-04-02",
        },
        {
          title: "KeTIK 2014 (Galeri Online Kesenian Minang)",
          link:
            "https://d1wqtxts1xzle7.cloudfront.net/46576783/Galeri_Online_Kesenian_Minang-libre.pdf?1466193841=",
          date: "2014-10-01",
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Publikasi Dosen PSTEAM
        </h2>

        <div className="space-y-8">
          {dosenList.map((dosen, i) => (
            <article
              key={i}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
              data-aos="fade-up"
            >
              {/* Top: avatar + basic info */}
              <div className="flex flex-col items-center p-6 text-center">
                <div className="relative w-28 h-28 mb-4">
                  <Image
                    src={dosen.image}
                    alt={dosen.name}
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900">
                  {dosen.name}
                </h3>
                <p className="text-gray-600 text-sm">{dosen.position}</p>
                <p className="text-gray-500 text-sm mt-1">{dosen.program}</p>

                {/* Socials under avatar */}
                <div className="flex items-center space-x-4 mt-4">
                  {dosen.socials?.github && (
                    <a
                      href={dosen.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                      aria-label={`${dosen.name} Github`}
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                  )}
                  {dosen.socials?.linkedin && (
                    <a
                      href={dosen.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700"
                      aria-label={`${dosen.name} LinkedIn`}
                    >
                      <FaLinkedin className="text-2xl" />
                    </a>
                  )}
                  {dosen.socials?.facebook && (
                    <a
                      href={dosen.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                      aria-label={`${dosen.name} Facebook`}
                    >
                      <FaFacebook className="text-2xl" />
                    </a>
                  )}
                  {dosen.socials?.instagram && (
                    <a
                      href={dosen.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-500"
                      aria-label={`${dosen.name} Instagram`}
                    >
                      <FaInstagram className="text-2xl" />
                    </a>
                  )}
                </div>
              </div>

              {/* Middle: contact + education + specialization */}
              <div className="px-6 pb-4 border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${dosen.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {dosen.email}
                    </a>
                  </p>

                  {dosen.education && (
                    <div>
                      <strong>Riwayat Pendidikan:</strong>
                      <ul className="list-disc list-inside text-gray-600 mt-1">
                        {dosen.education.map((edu, idx) => (
                          <li key={idx}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {dosen.specialization && (
                    <p>
                      <strong>Bidang Spesialis:</strong> {dosen.specialization}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom: publications (scrollable) */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Publikasi & Dokumen
                </h4>

                <div className="space-y-2">
                  <div className="overflow-y-auto max-h-56 rounded-lg bg-gray-50 p-3 border border-gray-100">
                    {dosen.publications.map((pub, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3 py-2 border-b last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-800 hover:underline block truncate"
                            title={pub.title}
                          >
                            {pub.title}
                          </a>
                          {pub.date && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(pub.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border text-xs text-blue-600 hover:bg-blue-50"
                            title="Buka PDF / Link"
                          >
                            <FaFilePdf className="text-sm" />
                            <span className="hidden sm:inline">PDF</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
