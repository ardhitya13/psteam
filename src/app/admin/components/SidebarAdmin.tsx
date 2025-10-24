"use client";
import {
  Menu,
  Home,
  ClipboardList,
  GraduationCap,
  FileText,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  CheckCircle,
  Briefcase,
  BookOpen,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function SidebarAdmin({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>({
    pengajuan: false,
    portofolio: false,
  });

  useEffect(() => setMounted(true), []);

  // Refs untuk tooltip
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const setRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    refs.current[key] = el;
  }, []);

  // Tooltip global
  const Tooltip = ({ text, targetRef }: { text: string; targetRef: HTMLDivElement | null }) => {
    if (!mounted || !targetRef) return null;
    const rect = targetRef.getBoundingClientRect();
    return createPortal(
      <div
        className="fixed z-[99999] px-2 py-1 bg-white text-[#0a3b91] text-sm font-semibold rounded-md shadow-md transition-all duration-150 whitespace-nowrap pointer-events-none"
        style={{
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 10}px`,
          transform: "translateY(-50%)",
        }}>
        {text}
      </div>,
      document.body
    );
  };

  return (
    <aside
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-[#0a3b91] text-white transition-all duration-300 ${
        isOpen ? "w-[232px]" : "w-[80px]"
      } z-40 overflow-y-auto`} >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-800">
        <button
          onClick={toggle}
          className="flex items-center text-white hover:text-gray-200 transition" >
          <Menu size={24} strokeWidth={2} />
          {isOpen && <span className="ml-3 text-sm font-semibold">MENU</span>}
        </button>
      </div>

      {/* NAV */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {/* BERANDA */}
          <li>
            <Link href="/admin" className="block mx-3 relative">
              <div
                ref={setRef("beranda")}
                onMouseEnter={() => setHoveredItem("Beranda")}
                onMouseLeave={() => setHoveredItem(null)}
                className="group flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-200 hover:bg-white cursor-pointer" >
                <Home
                  size={22}
                  strokeWidth={2.4}
                  className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]" />
                {isOpen && (
                  <span className="text-white text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#0a3b91]">
                    Beranda
                  </span>
                )}
              </div>
              {!isOpen && hoveredItem === "Beranda" && (
                <Tooltip text="Beranda" targetRef={refs.current["beranda"]} />
              )}
            </Link>
          </li>

          {/* DAFTAR PENGAJUAN */}
          <li>
            <div className="mx-3">
              <div
                ref={setRef("pengajuan")}
                onMouseEnter={() => setHoveredItem("Daftar Pengajuan")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() =>
                  setOpenDropdown((prev) => ({
                    pengajuan: !prev.pengajuan,
                    portofolio: false,
                  }))
                }
                className="group flex items-center justify-between w-full py-3 px-3 rounded-md transition-all duration-200 cursor-pointer hover:bg-white" >
                <div className="flex items-center gap-3">
                  <FolderPlus
                    size={22}
                    strokeWidth={2.4}
                    className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]" />
                  {isOpen && (
                    <span className="text-white text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#0a3b91]">
                      Daftar Pengajuan
                    </span>
                  )}
                </div>
                {isOpen &&
                  (openDropdown.pengajuan ? (
                    <ChevronUp size={18} className="text-white group-hover:text-[#0a3b91]" />
                  ) : (
                    <ChevronDown size={18} className="text-white group-hover:text-[#0a3b91]" />
                  ))}
              </div>

              {!isOpen && hoveredItem === "Daftar Pengajuan" && (
                <Tooltip text="Daftar Pengajuan" targetRef={refs.current["pengajuan"]} />
              )}

              {/* Smooth animation dropdown */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openDropdown.pengajuan ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`} >
                <ul className="mt-1 space-y-1">
                  {[
                    { name: "Daftar Proyek", href: "/admin/kelola/proyek", icon: ClipboardList },
                    { name: "Verifikasi Proyek", href: "/admin/kelola/verifikasiproyek", icon: CheckCircle,},

                  ].map(({ name, href, icon: Icon }) => (
                    <li key={name}>
                      <Link href={href} className="block relative">
                        <div
                          ref={setRef(name)}
                          onMouseEnter={() => setHoveredItem(name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="group flex items-center gap-3 py-2 px-5 rounded-md text-[14px] font-medium text-white hover:bg-white transition-all duration-200 cursor-pointer">
                          <Icon
                            size={18}
                            strokeWidth={2}
                            className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]"
                          />
                          {isOpen && (
                            <span className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]">
                              {name}
                            </span>
                          )}
                        </div>
                        {!isOpen && hoveredItem === name && (
                          <Tooltip text={name} targetRef={refs.current[name]} />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* DAFTAR PELATIHAN */}
          <li>
            <Link href="/admin/kelola/pelatihan" className="block mx-3 relative">
              <div
                ref={setRef("pelatihan")}
                onMouseEnter={() => setHoveredItem("Daftar Pelatihan")}
                onMouseLeave={() => setHoveredItem(null)}
                className="group flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-200 hover:bg-white cursor-pointer">
                <GraduationCap
                  size={22}
                  strokeWidth={2.4}
                  className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]"/>
                {isOpen && (
                  <span className="text-white text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#0a3b91]">
                    Daftar Pelatihan
                  </span>
                )}
              </div>
              {!isOpen && hoveredItem === "Daftar Pelatihan" && (
                <Tooltip text="Daftar Pelatihan" targetRef={refs.current["pelatihan"]} />
              )}
            </Link>
          </li>

          {/* PORTOFOLIO */}
          <li>
            <div className="mx-3">
              <div
                ref={setRef("portofolio")}
                onMouseEnter={() => setHoveredItem("Portofolio")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() =>
                  setOpenDropdown((prev) => ({
                    pengajuan: false,
                    portofolio: !prev.portofolio,
                  }))
                }
                className="group flex items-center justify-between w-full py-3 px-3 rounded-md transition-all duration-200 cursor-pointer hover:bg-white" >
                <div className="flex items-center gap-3">
                  <Briefcase
                    size={22}
                    strokeWidth={2.4}
                    className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]" />
                  {isOpen && (
                    <span className="text-white text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#0a3b91]">
                      Portofolio
                    </span>
                  )}
                </div>
                {isOpen &&
                  (openDropdown.portofolio ? (
                    <ChevronUp size={18} className="text-white group-hover:text-[#0a3b91]" />
                  ) : (
                    <ChevronDown size={18} className="text-white group-hover:text-[#0a3b91]" />
                  ))}
              </div>
              {!isOpen && hoveredItem === "Portofolio" && (
                <Tooltip text="Portofolio" targetRef={refs.current["portofolio"]} />
              )}

              {/* Smooth animation dropdown */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openDropdown.portofolio ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-1 space-y-1">
                  {[
                    { name: "Penelitian", href: "/admin/portofolio/penelitian", icon: FileText },
                    {
                      name: "Pengabdian Masyarakat",
                      href: "/admin/portofolio/pengabdian",
                      icon: BookOpen,
                    },
                    {
                      name: "Publikasi Karya",
                      href: "/admin/portofolio/karyailmiah",
                      icon: PenTool,
                    },
                    { name: "HKI/Paten", href: "/admin/portofolio/hki", icon: ShieldCheck },
                  ].map(({ name, href, icon: Icon }) => (
                    <li key={name}>
                      <Link href={href} className="block relative">
                        <div
                          ref={setRef(name)}
                          onMouseEnter={() => setHoveredItem(name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="group flex items-center gap-3 py-2 px-5 rounded-md text-[14px] font-medium text-white hover:bg-white transition-all duration-200 cursor-pointer">
                          <Icon
                            size={18}
                            strokeWidth={2}
                            className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]"/>
                          {isOpen && (
                            <span className="text-white transition-colors duration-200 group-hover:text-[#0a3b91]">
                              {name}
                            </span>
                          )}
                        </div>
                        {!isOpen && hoveredItem === name && (
                          <Tooltip text={name} targetRef={refs.current[name]} />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
