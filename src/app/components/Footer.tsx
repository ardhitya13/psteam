"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 w-full">
      <div className="mx-auto w-full max-w-screen-xl">
        {/* Grid Section */}
        <div className="grid grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              PSTeam
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-3">
              <li>
                <Link href="/about" className="hover:underline">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">Layanan</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:underline">Portfolio</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:underline">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Bantuan
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-3">
              <li>
                <Link href="/contact" className="hover:underline">Kontak</Link>
              </li>
              <li>
                <a href="#" className="hover:underline">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Support</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Community</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-3">
              <li>
                <a href="#" className="hover:underline">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Syarat & Ketentuan</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Ikuti Kami
            </h2>
            <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-blue-600">Facebook</a>
              <a href="#" className="hover:text-sky-400">Twitter</a>
              <a href="#" className="hover:text-pink-500">Instagram</a>
              <a href="#" className="hover:text-gray-900">GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-6 bg-gray-100 dark:bg-gray-800 text-center md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300">
            © {new Date().getFullYear()} <span className="font-semibold">PSTeam</span>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
