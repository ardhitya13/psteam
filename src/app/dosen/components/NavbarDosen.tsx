"use client";

import { Menu, LogOut, User, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavbarDosen({ toggle }: { toggle: () => void }) {
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
    <nav className="fixed top-0 left-0 w-full h-[64px] bg-white shadow-md flex justify-between items-center px-6 z-50">
      {/* Logo PSTEAM */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-[#0a3b91] hover:text-[#1e40af] transition"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <Image
            src="/images/logopsteam4.png"
            alt="Logo PSTEAM"
            width={38}
            height={38}
            className="object-contain"
            priority
          />
          <h1 className="font-bold text-[#0a3b91] text-lg select-none">
            PSTEAM
            <span className="font-medium text-gray-600 ml-1 hidden sm:inline">
              Dashboard Dosen
            </span>
          </h1>
        </div>
      </div>

      {/* Profil Dosen */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <div className="w-10 h-10 rounded-full bg-[#0a3b91] text-white flex items-center justify-center font-semibold">
            AD
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl border border-gray-100 py-2 text-sm animate-fade-in">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-semibold text-gray-800">
                Ardhitya Danur Siswondo
              </p>
              <p className="text-gray-500 text-xs">Dosen Teknik Informatika</p>
            </div>

            <button
              onClick={() => {
                setIsDropdownOpen(false);
                router.push("/dosen/profil");
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700"
            >
              <User size={16} className="mr-2 text-[#0a3b91]" />
              Lihat Profil
            </button>

            <button className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700">
              <Settings size={16} className="mr-2 text-[#0a3b91]" />
              Edit Profil
            </button>

            <hr className="my-1" />

            <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50">
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
