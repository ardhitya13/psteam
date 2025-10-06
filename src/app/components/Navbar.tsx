"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Efek untuk menyembunyikan navbar ketika scroll ke bawah
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll ke bawah → sembunyikan navbar
        setHidden(true);
      } else {
        // Scroll ke atas → tampilkan navbar
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white fixed w-full z-50 top-0 left-0 border-b border-gray-200 shadow-md transition-all duration-500 ease-in-out transform ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse transform transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logopsteam1.png"
            alt="PSTeam Logo"
            width={130}
            height={130}
            priority
            className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
          />
        </Link>

        {/* Button kanan */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            href="/login"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none 
                       focus:ring-blue-300 font-semibold rounded-lg text-base px-6 py-2 text-center 
                       shadow-sm hover:shadow-md transition-all duration-300"
          >
            Login
          </Link>

          {/* Burger menu untuk mobile */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
                       text-gray-600 rounded-lg md:hidden hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 font-semibold text-lg border border-gray-100 rounded-lg 
                         bg-gray-50 md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 
                         md:border-0 md:bg-white"
          >
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Team", path: "/team" },
              { name: "Research", path: "/research" },
              { name: "Publication", path: "/publication" },
              { name: "Projects", path: "/projects" },
              { name: "Services", path: "/services" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="block py-2 px-3 text-gray-800 hover:text-blue-600 transition-colors duration-200 md:p-0 
                             tracking-wide hover:scale-110 transform transition-transform duration-200 text-lg"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
