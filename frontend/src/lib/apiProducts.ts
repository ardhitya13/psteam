"use client";

const BASE_URL = "http://localhost:4000/api/products";

/* =========================
   AUTH HEADER
========================= */
function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/* =========================
   GET ALL (PUBLIC)
========================= */
export async function getAllProducts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return res.json();
}

/* =========================
   GET BY ID (PUBLIC)
========================= */
export async function getProductById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Produk tidak ditemukan");
  return res.json();
}

/* =========================
   CREATE (ADMIN)
========================= */
export async function createProduct(formData: FormData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal membuat produk");
  return res.json();
}

/* =========================
   UPDATE (ADMIN)
========================= */
export async function updateProduct(id: number, formData: FormData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) throw new Error("Gagal mengupdate produk");
  return res.json();
}

/* =========================
   DELETE (ADMIN)
========================= */
export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Gagal menghapus produk");
  return res.json();
}
