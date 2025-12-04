"use client";

import React, { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper";

export default function AddLecturerAccountModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(form);
    onClose();

    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} width="max-w-xl">
      {/* ❗ TIDAK ADA BG-WHITE / CARD LAIN DI SINI */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Tambah Akun Dosen
      </h2>

      <form onSubmit={submit} className="space-y-5">
        <Input
          label="Nama Dosen"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Input
          label="Nomor HP (Opsional)"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 rounded-lg"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tambah
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full px-4 py-3 border rounded-xl bg-white text-gray-800"
      />
    </div>
  );
}
