"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsGithub, BsLinkedin, BsInstagram, BsFacebook } from "react-icons/bs";
import { useLocale } from "../../context/LocaleContext"; // ✅ ambil bahasa aktif

interface Translation {
  title?: string;
  description?: string;
  allCategories?: string;
  readMore?: string;
  showMore?: string;
  showLess?: string;
}

export default function PublicationSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({
    title: "Publikasi",
    description:
      "Kumpulan publikasi ilmiah tim kami dalam bidang AI, Web, Mobile, dan IoT.",
    allCategories: "Semua Kategori",
    readMore: "Baca Selengkapnya →",
    showMore: "Lihat Selengkapnya",
    showLess: "Tampilkan Lebih Sedikit",
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // 🔁 Load JSON translate
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(
          `../../locales/${locale}/publications/publicationsection.json`
        );
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan PublicationSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // 🧩 Data publikasi (bisa tetap bilingual jika mau nanti)
  const publications = [
    {
      id: 1,
      title: "AI Optimization for IoT Systems",
      description:
        "Studi penerapan kecerdasan buatan untuk meningkatkan efisiensi sistem IoT secara real-time di industri manufaktur.",
      date: "15 Juni 2025",
      category: "IoT",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
      link: "#",
      authors: [
        {
          name: "Ardhitya Danur Siswondo",
          gender: "male",
          socials: {
            github: "https://github.com/ardhitya13",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
        {
          name: "Farhan Rasyid",
          gender: "male",
          socials: {
            github: "#",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Smart Campus Integration",
      description:
        "Pengembangan sistem kampus pintar berbasis IoT dan machine learning untuk efisiensi energi dan keamanan lingkungan.",
      date: "10 November 2024",
      category: "AI",
      image: "/publications/publicationssection1.png",
      link: "#",
      authors: [
        {
          name: "Arifah Husaini",
          gender: "female",
          socials: {
            github: "#",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
      ],
    },
    {
      id: 3,
      title: "Web Development Trends 2025",
      description:
        "Analisis framework dan teknologi modern yang membentuk tren pengembangan aplikasi web tahun 2025.",
      date: "3 Januari 2025",
      category: "Web",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      link: "#",
      authors: [
        {
          name: "Anggun Salsa Faradita",
          gender: "female",
          socials: {
            github: "#",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
        {
          name: "Farhan Rasyid",
          gender: "male",
          socials: {
            github: "#",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
      ],
    },
    {
      id: 4,
      title: "AI-Driven Mobile Experience",
      description:
        "Penelitian pengalaman pengguna adaptif berbasis AI untuk meningkatkan interaksi pada aplikasi mobile.",
      date: "20 Mei 2023",
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
      link: "#",
      authors: [
        {
          name: "Ardhitya Danur Siswondo",
          gender: "male",
          socials: {
            github: "https://github.com/ardhitya13",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
        {
          name: "Anggun Salsa Faradita",
          gender: "female",
          socials: {
            github: "#",
            linkedin: "#",
            instagram: "#",
            facebook: "#",
          },
        },
      ],
    },
  ];

  const categories = ["All", "Web", "Mobile", "IoT", "AI"];
  const filteredPublications =
    selectedCategory === "All"
      ? publications
      : publications.filter((p) => p.category === selectedCategory);

  const displayedPublications = showAll
    ? filteredPublications
    : filteredPublications.slice(0, 3);

  return (
    <section
      id="publication"
      className="py-20 min-h-screen flex flex-col items-center"
      style={{ backgroundColor: "#1e376c" }}
    >
      <div className="w-[90%] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto px-4">
        {/* === Header === */}
        <h2
          className="text-4xl font-bold text-center mb-4 text-white"
          data-aos="fade-up"
        >
          {t.title}
        </h2>
        <p
          className="text-center text-gray-200 mb-10 mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t.description}
        </p>

        {/* === Filter Buttons === */}
        <div
          className="flex justify-center flex-wrap gap-4 mb-10"
          data-aos="fade-up"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border shadow-md ${
                selectedCategory === cat
                  ? "bg-white text-[#1e376c] scale-105"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-[#1e376c]"
              }`}
            >
              {cat === "All" ? t.allCategories : cat}
            </button>
          ))}
        </div>

        {/* === Publications === */}
        <div
          className="flex flex-col gap-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {displayedPublications.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden w-full"
              data-aos="zoom-in-up"
            >
              {/* Image */}
              <div className="md:w-2/5 w-full">
                <Image
                  src={pub.image}
                  alt={pub.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-72 md:h-full"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=No+Image")
                  }
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between md:w-3/5 w-full">
                <div>
                  <h3
                    className="text-3xl font-semibold mb-3"
                    style={{ color: "#1e376c" }}
                  >
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {pub.date} • {pub.category}
                  </p>
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    {pub.description}
                  </p>
                  <Link
                    href={pub.link}
                    className="inline-block text-white bg-[#1e376c] px-5 py-2.5 rounded-lg hover:bg-[#2a4a8c] transition-all duration-300 font-medium shadow-md"
                  >
                    {t.readMore}
                  </Link>
                </div>

                {/* Authors */}
                <div className="flex items-center mt-6 flex-wrap gap-4">
                  {pub.authors.map((author) => (
                    <div key={author.name} className="flex items-center space-x-3">
                      <div className="relative w-11 h-11 overflow-hidden bg-gray-100 rounded-full">
                        <svg
                          className={`absolute w-12 h-12 ${
                            author.gender === "male"
                              ? "text-gray-400"
                              : "text-pink-400"
                          } -left-1`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {author.name}
                        </span>
                        <div className="flex space-x-2 text-gray-500 text-sm">
                          <Link href={author.socials.github}>
                            <BsGithub className="hover:text-gray-800" />
                          </Link>
                          <Link href={author.socials.linkedin}>
                            <BsLinkedin className="hover:text-[#0e76a8]" />
                          </Link>
                          <Link href={author.socials.instagram}>
                            <BsInstagram className="hover:text-[#e1306c]" />
                          </Link>
                          <Link href={author.socials.facebook}>
                            <BsFacebook className="hover:text-[#1877F2]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === Show More Button === */}
        {filteredPublications.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-white text-[#1e376c] px-7 py-2.5 rounded-full font-semibold hover:bg-[#2a4a8c] hover:text-white transition-all duration-300 shadow-lg"
            >
              {showAll ? t.showLess : t.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
