export async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan, silakan login ulang");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request gagal");
  }

  return data;
}
