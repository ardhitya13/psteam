"use client";

import React from "react";
import { XCircle, CheckCircle, X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import { Registration } from "./TrainingVerifyAdmin";

export default function TrainingVerificationStatusModal({
  data,
  action,
  onConfirm,
  onClose,
}: {
  data: Registration;
  action: "approved" | "rejected";
  onConfirm: () => void;
  onClose: () => void;
}) {
  const isApprove = action === "approved";

  return (
    <ModalWrapper isOpen={true} onClose={onClose} width="400px">
      <div className="p-4 text-center">
        {isApprove ? (
          <CheckCircle className="text-green-600 mx-auto" size={60} />
        ) : (
          <XCircle className="text-red-600 mx-auto" size={60} />
        )}

        <h2 className="text-xl font-bold mt-3">
          {isApprove ? "Terima Pendaftaran?" : "Tolak Pendaftaran?"}
        </h2>

        <p className="text-gray-600 mt-1">
          Anda yakin ingin {isApprove ? "menyetujui" : "menolak"} pendaftaran dari{" "}
          <span className="font-semibold">{data.name}</span>?
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className={`px-4 py-2 rounded text-white ${
              isApprove ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onConfirm}
          >
            Ya, {isApprove ? "Terima" : "Tolak"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
