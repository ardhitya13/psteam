"use client";

export type ProductPayload = {
  image?: string; // optional untuk update
  title: string;
  category: string;
  academicYear: string;
  description: string;
  link: string;
  publishDate: string;
};

const BASE_URL = "http://localhost:4000/api/products";

/* GET ALL */
export async function getAllProducts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return res.json();
}

/* GET BY ID */
export async function getProductById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Produk tidak ditemukan");
  return res.json();
}

/* CREATE (POST + FILE UPLOAD) */
export async function createProduct(formData: FormData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Gagal membuat produk");
  return res.json();
}

/* UPDATE (PUT) */
export async function updateProduct(id: number, formData: FormData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Gagal mengupdate produk");
  return res.json();
}

/* DELETE */
export async function deleteProduct(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal menghapus produk");
  return res.json();
}
