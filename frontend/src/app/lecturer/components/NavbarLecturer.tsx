"use client";

import { Menu, LogOut, User, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavbarLecturer({ toggle }: { toggle: () => void }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        
        {/* ==== LOGO ==== */}
        <a href="#" className="flex items-center space-x-3">
          <div className="relative w-[120px] h-[30px] overflow-hidden">
            <Image
              src="/logopsteam1.png"
              alt="PSTEAM Logo"
              fill
              className="object-cover object-center"
            />
          </div>
        </a>

        {/* ==== TITLE / DASHBOARD ==== */}
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-[#0a3b91] text-lg select-none">
            <span className="font-medium text-gray-600 ml-1 hidden sm:inline">
              Dashboard Dosen
            </span>
          </h1>
        </div>

        {/* ==== PROFIL DOSEN ==== */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#0a3b91] text-white flex items-center justify-center font-semibold">
              AH
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl border border-gray-100 py-2 text-sm animate-fade-in">
              {/* === Info Profil === */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">
                  Arifah Husaini
                </p>
                <p className="text-gray-500 text-xs">Dosen Teknik Informatika</p>
              </div>

              {/* === Aksi Profil === */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/lecturer/profil");
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                <User size={16} className="mr-2 text-[#0a3b91]" />
                Lihat Profil
              </button>

              {/* <button className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700">
                <Settings size={16} className="mr-2 text-[#0a3b91]" />
                Edit Profil
              </button> */}

              <hr className="my-1" />

              <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50">
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>

  );
}
