"use client";

import React from "react";
import { X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import { Registration } from "./TrainingVerifyAdmin";

export default function TrainingVerificationDetailModal({
  data,
  onClose,
}: {
  data: Registration;
  onClose: () => void;
}) {
  return (
    <ModalWrapper isOpen={true} onClose={onClose} width="700px">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detail Pendaftaran</h2>
        </div>

        <table className="w-full text-sm border border-gray-300 rounded">
          <tbody>
            <tr>
              <td className="p-2 border font-semibold">Nama</td>
              <td className="p-2 border">{data.name}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Email</td>
              <td className="p-2 border">{data.email}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Telepon</td>
              <td className="p-2 border">{data.phone}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Pelatihan</td>
              <td className="p-2 border">{data.trainingTitle}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Tipe</td>
              <td className="p-2 border capitalize">{data.trainingType}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Batch</td>
              <td className="p-2 border">{data.batch}</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">Catatan</td>
              <td className="p-2 border">{data.notes || "-"}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
