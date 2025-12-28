"use client";

export type SubmissionPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  projectTitle: string;
  projectDescription: string;
  projectType?: string;
};

const BASE_URL = "http://localhost:4000/api/submissions";

/* ===============================
   AUTH HEADER (ADMIN)
================================ */
const getAuthHeaders = (): HeadersInit => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ Token tidak ditemukan di localStorage");
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

/* ===============================
   PUBLIC — CREATE SUBMISSION
================================ */
export async function createSubmission(payload: SubmissionPayload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Gagal mengirim pengajuan");
  }

  return res.json();
}

/* ===============================
   ADMIN — GET PENDING
================================ */
export async function getPendingSubmissions() {
  const res = await fetch(`${BASE_URL}/pending`, {
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil pengajuan pending (Unauthorized)");
  }

  return res.json();
}

/* ===============================
   ADMIN — GET APPROVED
================================ */
export async function getApprovedSubmissions() {
  const res = await fetch(`${BASE_URL}/approved`, {
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil pengajuan approved (Unauthorized)");
  }

  return res.json();
}

/* ===============================
   ADMIN — APPROVE SUBMISSION
================================ */
export async function approveSubmission(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/approve`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Gagal menyetujui pengajuan");
  }

  return res.json();
}

/* ===============================
   ADMIN — REJECT SUBMISSION
================================ */
export async function rejectSubmission(id: number, adminNote?: string) {
  const res = await fetch(`${BASE_URL}/${id}/reject`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminNote }),
  });

  if (!res.ok) {
    throw new Error("Gagal menolak pengajuan");
  }

  return res.json();
}
