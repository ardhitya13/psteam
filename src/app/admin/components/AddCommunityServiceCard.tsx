"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface TambahPengabdianCardProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { nama: string; judul: string; tahun: number }) => void;
}

export default function TambahPengabdianCard({
    isOpen,
    onClose,
    onSubmit,
}: TambahPengabdianCardProps) {
    const [formData, setFormData] = useState({
        nama: "",
        judul: "",
        tahun: new Date().getFullYear(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ nama: "", judul: "", tahun: new Date().getFullYear() }); // reset form
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Tambah Judul Pengabdian Masyarakat
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Dosen */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Dosen
                    </label>
                    <input
                        type="text" name="nama" placeholder="Nama Dosen" value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" 
                        required/>
                </div>

                {/* Judul Pengabdian */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Judul Pengabdian
                    </label>
                    <input 
                        type="text" name="judul" placeholder="Judul Pengabdian Masyarakat" value={formData.judul}
                        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" 
                        required/>
                </div>

                {/* Tahun */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tahun Penelitian
                    </label>
                    <input
                        type="number" name="tahun" min={2000} max={2100} value={formData.tahun}
                        onChange={(e) => setFormData({ ...formData, tahun: Number(e.target.value) }) }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Masukkan tahun" required/>
                </div>

                {/* Tombol aksi */}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                        Tambahkan
                    </button>
                </div>
            </form>
        </ModalWrapper>
    );
}
