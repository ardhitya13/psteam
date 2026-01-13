"use client";

import React from "react";
import ModalWrapper from "./ModalWrapper";
import type { Registration } from "@/types/trainingRegistration";

const BASE_URL = "http://localhost:4000";

export default function TrainingVerifyDetailModal({
  data,
  onClose,
}: {
  data: Registration;
  onClose: () => void;
}) {
  const thumbnail = data.trainingThumbnail
    ? `${BASE_URL}${data.trainingThumbnail}`
    : "/default-training.png";

  return (
    <ModalWrapper isOpen={true} onClose={onClose} width="max-w-2xl">
      <div className="p-6 space-y-5">
        <h2 className="text-xl font-bold text-black">Detail Pendaftaran Pelatihan</h2>

        <div className="flex gap-4 p-4 bg-gray-50 border text-black rounded">
          <img
            src={thumbnail}
            alt={data.trainingTitle}
            className="w-28 h-20 rounded object-cover border text-black"
          />

          <div>
            <p className="font-semibold text-black">{data.trainingTitle}</p>
            <p className="text-sm text-black">Tipe: {data.trainingType}</p>
            <p className="text-sm text-black">Batch: {data.batch}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-black">
          <div>
            <p className="text-black ">Nama</p>
            <p className="font-semibold">{data.name}</p>
          </div>

          <div>
            <p className="text-black">Email</p>
            <p className="font-semibold">{data.email}</p>
          </div>

          <div>
            <p className="text-black">Telepon</p>
            <p className="font-semibold">{data.phone}</p>
          </div>

          <div>
            <p className="text-black">Status</p>
            <p className="font-semibold capitalize">{data.status}</p>
          </div>
        </div>

        <div>
          <p className="text-black text-sm">Catatan</p>
          <div className="bg-gray-100 p-3 rounded text-sm text-black">
            {data.notes || "Tidak ada catatan"}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
