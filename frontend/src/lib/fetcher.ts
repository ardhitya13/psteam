// src/lib/fetcher.ts
export async function fetcher(
  url: string,
  options: RequestInit = {}
) {
  const isForm = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // 🔐 Inject JWT token (SATU-SATUNYA TEMPAT TOKEN)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  if (!isForm) {
    headers["Content-Type"] ??= "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // ignore json parse error
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }

  return data;
}
