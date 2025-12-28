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

const BASE_URL = "http://localhost:4000/api/training-registrations";

/* ================================
   GET ALL (ADMIN)
================================ */
export async function getAllRegistrations() {
  const res = await fetch(`${BASE_URL}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil semua pendaftaran");
  return res.json();
}

/* ================================
   GET PENDING
================================ */
export async function getPendingRegistrations() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token admin tidak ditemukan");
  }

  const res = await fetch(`${BASE_URL}/pending`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal mengambil pendaftaran pending: ${text}`);
  }

  return res.json();
}

/* ================================
   GET APPROVED
================================ */
export async function getApprovedRegistrations() {
  const res = await fetch(`${BASE_URL}/approved`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil pendaftaran approved");
  return res.json();
}

/* ================================
   CREATE REGISTRATION (PUBLIC)
================================ */
export async function createTrainingRegistration(
  payload: TrainingRegistrationPayload
) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Gagal mengirim pendaftaran pelatihan");
  return res.json();
}

/* ================================
   UPDATE STATUS
================================ */
export async function updateTrainingStatus(
  id: number,
  status: "approved" | "rejected"
) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token admin tidak ditemukan");
  }

  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 INI YANG HILANG
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gagal memperbarui status: ${text}`);
  }

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
