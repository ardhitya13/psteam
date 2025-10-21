"use client";

import { useEffect } from "react";
import Image from "next/image";
import { initFlowbite } from "flowbite";

interface NavbarAdminProps {
  toggle: () => void;
}

export default function NavbarAdmin({ toggle }: NavbarAdminProps) {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-md :bg-white"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative w-[120px] h-[30px] overflow-hidden">
            <Image
              src="/logopsteam1.png"
              alt="PSTEAM Logo"
              fill
              className="object-cover object-center"
            />
          </div>
        </a>

        {/* AVATAR USER + DROPDOWN */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://ui-avatars.com/api/?name=Bonnie+Green&background=0D8ABC&color=fff"
              alt="user photo"
            />
          </button>

          {/* Dropdown menu */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Admin
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Ganti Sandi
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Keluar
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
