"use client";

export type TrainingRegistrationPayload = {
  name: string;
  email: string;
  phone: string;
  trainingTitle: string;
  trainingType: string;
  batch: string;
  notes?: string;
};

const BASE_URL = "http://localhost:4000/api/trainings";

/* ================================
   GET ALL (DEBUG / ADMIN)
================================ */
export async function getAllRegistrations() {
  const res = await fetch(`${BASE_URL}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil semua pendaftaran");
  return res.json();
}

/* ================================
   GET PENDING (HALAMAN VERIFIKASI)
================================ */
export async function getPendingRegistrations() {
  const res = await fetch(`${BASE_URL}/pending`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil pendaftaran pending");
  return res.json();
}

/* ================================
   GET APPROVED (HALAMAN PESERTA)
================================ */
export async function getApprovedRegistrations() {
  const res = await fetch(`${BASE_URL}/approved`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil pendaftaran approved");
  return res.json();
}

/* ================================
   CREATE TRAINING REGISTRATION
================================ */
export async function createTrainingRegistration(
  payload: TrainingRegistrationPayload
) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengirim pendaftaran pelatihan");
  return res.json();
}

/* ================================
   UPDATE STATUS (APPROVE / REJECT)
================================ */
export async function updateTrainingStatus(
  id: number,
  status: "approved" | "rejected"
) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Gagal memperbarui status");
  return res.json();
}

/* ================================
   DELETE REGISTRATION
================================ */
export async function deleteTrainingRegistration(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Gagal menghapus pendaftaran");
  return res.json();
}
