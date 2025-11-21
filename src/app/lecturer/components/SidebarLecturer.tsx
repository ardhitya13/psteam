"use client";
import {
  Menu,
  Home,
  FileText,
  BookOpen,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation"; // ✅ untuk deteksi halaman aktif

export default function SidebarLecturer({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname(); // ✅ ambil path halaman aktif

  useEffect(() => setMounted(true), []);

  // Tooltip refs
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const setRef = useCallback((key: string) => (el: HTMLDivElement | null) => {
    refs.current[key] = el;
  }, []);

  // Tooltip floating
  const Tooltip = ({
    text,
    targetRef,
  }: {
    text: string;
    targetRef: HTMLDivElement | null;
  }) => {
    if (!mounted || !targetRef) return null;
    const rect = targetRef.getBoundingClientRect();
    return createPortal(
      <div
        className="fixed z-[99999] px-2 py-1 bg-white text-[#0a3b91] text-sm font-semibold rounded-md shadow-md transition-all duration-150 whitespace-nowrap pointer-events-none"
        style={{
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 10}px`,
          transform: "translateY(-50%)",
        }}
      >
        {text}
      </div>,
      document.body
    );
  };

  // Menu utama
  const menus = [
    { name: "Beranda", href: "/dosen", icon: Home },
    { name: "Penelitian", href: "/dosen/penelitian", icon: FileText },
    { name: "Pengabdian", href: "/dosen/pengabdian", icon: BookOpen },
    { name: "Karya Ilmiah", href: "/dosen/karyailmiah", icon: PenTool },
    { name: "HKI / Paten", href: "/dosen/hki", icon: ShieldCheck },
  ];

  return (
    <aside
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-[#0a3b91] text-white transition-all duration-300 ${
        isOpen ? "w-[232px]" : "w-[80px]"
      } z-40 overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-800">
        <button
          onClick={toggle}
          className="flex items-center text-white hover:text-gray-200 transition"
        >
          <Menu size={24} strokeWidth={2} />
          {isOpen && (
            <span className="ml-3 text-sm font-semibold tracking-wide">MENU</span>
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {menus.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href; // ✅ cek halaman aktif

            return (
              <li key={name}>
                <Link href={href} className="block mx-3 relative">
                  <div
                    ref={setRef(name)}
                    onMouseEnter={() => setHoveredItem(name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-white text-[#0a3b91]" // aktif
                          : "hover:bg-white hover:text-[#0a3b91]" // tidak aktif
                      }`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={2.3}
                      className={`transition-colors duration-200 ${
                        isActive ? "text-[#0a3b91]" : "text-white group-hover:text-[#0a3b91]"
                      }`}
                    />
                    {isOpen && (
                      <span
                        className={`text-[15px] font-semibold transition-colors duration-200 ${
                          isActive ? "text-[#0a3b91]" : "text-white group-hover:text-[#0a3b91]"
                        }`}
                      >
                        {name}
                      </span>
                    )}
                  </div>

                  {/* Tooltip muncul saat sidebar ditutup */}
                  {!isOpen && hoveredItem === name && (
                    <Tooltip text={name} targetRef={refs.current[name]} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
