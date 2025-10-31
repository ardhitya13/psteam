"use client";

import React, { useState, useEffect } from "react";
import { FaTimes, FaTrashAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import type { Course } from "./CourseCardHorizontal";

type CartModalProps = {
  keranjang: Course[];
  onRemove: (id: number) => void;
  onClose: () => void;
  open: boolean;
};

export default function CartModal({
  keranjang,
  onRemove,
  onClose,
  open,
}: CartModalProps) {
  const [tahap, setTahap] = useState<"keranjang" | "form" | "sukses">("keranjang");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    metode: "Transfer Bank",
  });
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimateIn(true);
      document.body.style.overflow = "hidden"; // biar gak scroll background
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const totalHarga = keranjang.reduce((acc, item) => acc + item.price, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBayar = () => {
    if (keranjang.length === 0) return;
    setTahap("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) {
      alert("Isi nama dan email dulu ya!");
      return;
    }
    setTimeout(() => setTahap("sukses"), 800);
  };

  const kembali = () => setTahap("keranjang");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Animasi modal */}
      <div
        className={`relative bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl p-6 border border-gray-200 transform transition-all duration-500 ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        {/* Judul */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6 border-b pb-3">
          {tahap === "keranjang"
            ? "Keranjang Belanja"
            : tahap === "form"
            ? "Form Pembayaran"
            : "Pembayaran Berhasil"}
        </h2>

        {/* === Tahap 1: Keranjang === */}
        {tahap === "keranjang" && (
          <>
            {keranjang.length === 0 ? (
              <p className="text-gray-500 text-sm text-center mb-4 animate-fadeIn">
                Belum ada item di keranjang.
              </p>
            ) : (
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                {keranjang.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center border rounded-lg p-3 hover:shadow-sm transition-all duration-300 bg-white animate-fadeIn delay-${
                      index * 75
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {keranjang.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm font-semibold text-gray-800 mb-3">
                  <span>Total</span>
                  <span className="text-orange-600">
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  onClick={handleBayar}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 shadow transition-all"
                >
                  <FaCreditCard /> Bayar Sekarang
                </button>
              </div>
            )}
          </>
        )}

        {/* === Tahap 2: Form Pembayaran === */}
        {tahap === "form" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 animate-slideUp motion-safe:transition-transform"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Masukkan nama..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Aktif
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Masukkan email..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Metode Pembayaran
              </label>
              <select
                name="metode"
                value={formData.metode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              >
                <option>Transfer Bank</option>
                <option>QRIS</option>
                <option>Kartu Kredit</option>
                <option>E-Wallet (GoPay / OVO / Dana)</option>
              </select>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold text-gray-800 mb-3 text-sm">
                <span>Total Dibayar</span>
                <span className="text-orange-600">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={kembali}
                  className="w-1/2 border border-blue-500 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Kembali
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg transition"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </form>
        )}

        {/* === Tahap 3: Sukses === */}
        {tahap === "sukses" && (
          <div className="flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
            <FaCheckCircle className="text-green-600 text-5xl animate-bounce" />
            <h3 className="text-lg font-bold text-gray-800">
              Pembayaran Berhasil 🎉
            </h3>
            <p className="text-sm text-gray-600">
              Terima kasih, <span className="font-semibold">{formData.nama}</span>! <br />
              Kami telah mengirim konfirmasi ke email:{" "}
              <span className="font-semibold">{formData.email}</span>
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
