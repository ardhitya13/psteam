const BASE_URL = "http://localhost:4000/api/lecturer";

/* ======================================================
   HELPER: GET USER ID FROM JWT
====================================================== */
function getUserIdFromToken(): number {
  if (typeof window === "undefined") {
    throw new Error("Client only");
  }

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan");

  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));

  if (!decoded?.id) throw new Error("Token invalid");

  return decoded.id;
}

/* ======================================================
   FETCHER (AUTO HEADER + TOKEN)
====================================================== */
async function fetcher(url: string, options: RequestInit = {}) {
  const isForm = options.body instanceof FormData;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    ...(options.headers as Record<string, string> || {}),
  };

  if (!isForm) {
    headers["Content-Type"] ??= "application/json";
  }

  const res = await fetch(url, { ...options, headers });

  let data: any = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }

  return data;
}

/* ======================================================
   LECTURER
====================================================== */
export function getAllLecturers() {
  return fetcher(`${BASE_URL}`);
}

export function getLecturerProfile(userId: number) {
  return fetcher(`${BASE_URL}/${userId}`);
}

export function updateLecturerProfile(userId: number, data: any) {
  const isForm = data instanceof FormData;

  return fetcher(
    `${BASE_URL}/${userId}${isForm ? "/photo" : ""}`,
    {
      method: "PUT",
      body: isForm ? data : JSON.stringify(data),
    }
  );
}

/* ======================================================
   EDUCATION
====================================================== */
export function addEducation(userId: number, data: any) {
  return fetcher(`${BASE_URL}/${userId}/education`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEducation(id: number, data: any) {
  return fetcher(`${BASE_URL}/education/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteEducation(id: number) {
  return fetcher(`${BASE_URL}/education/${id}`, {
    method: "DELETE",
  });
}

/* ======================================================
   RESEARCH
====================================================== */
export function getMyResearch() {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/research`);
}

export function addResearch(data: { title: string; year: number }) {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/research`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function addResearchByAdmin(     //khusus admin
  userId: number,
  data: { title: string; year: number }
) {
  return fetcher(`${BASE_URL}/${userId}/research/admin`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateResearch(
  id: number,
  data: { title: string; year: number }
) {
  return fetcher(`${BASE_URL}/research/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteResearch(id: number) {
  return fetcher(`${BASE_URL}/research/${id}`, {
    method: "DELETE",
  });
}

/* ======================================================
   COMMUNITY SERVICE
====================================================== */
export function getMyCommunityService() {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/community-service`);
}

export function addCommunityService(data: { title: string; year: number }) {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/community-service`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function addCommunityServiceByAdmin(
  userId: number,
  data: { title: string; year: number }
) {
  return fetcher(`${BASE_URL}/${userId}/community-service`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCommunityService(
  id: number,
  data: { title: string; year: number }
) {
  return fetcher(`${BASE_URL}/community-service/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCommunityService(id: number) {
  return fetcher(`${BASE_URL}/community-service/${id}`, {
    method: "DELETE",
  });
}

/* ======================================================
   SCIENTIFIC WORK
====================================================== */
/* ======================================================
   SCIENTIFIC WORK (ADMIN BULK)
====================================================== */
export function saveScientificWorkBulk(
  userId: number,
  scientificworkList: {
    title: string;
    type: string;
    year: number;
  }[],
  mode: "append" | "replace" = "replace"
) {
  return fetcher(`${BASE_URL}/${userId}/scientific-work/bulk`, {
    method: "POST",
    body: JSON.stringify({
      scientificworkList,
      mode,
    }),
  });
}


export function getMyScientificWork() {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/scientific-work`);
}

export function addScientificWork(data: {
  title: string;
  type: string;
  year: number;
}) {
  const userId = getUserIdFromToken();

  return fetcher(`${BASE_URL}/${userId}/scientific-work/bulk`, {
    method: "POST",
    body: JSON.stringify({
      scientificworkList: [data],
    }),
  });
}

export function updateScientificWork(
  id: number,
  data: { title: string; type: string; year: number }
) {
  return fetcher(`${BASE_URL}/scientific-work/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteScientificWork(id: number) {
  return fetcher(`${BASE_URL}/scientific-work/${id}`, {
    method: "DELETE",
  });
}

/* ======================================================
   INTELLECTUAL PROPERTY ✅ FINAL FIX
====================================================== */

/** GET HKI dosen login */
export function getMyIntellectualProperty() {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/intellectual-property`);
}

/** ADD HKI */
export function addIntellectualProperty(data: {
  title: string;
  type: string;
  year: number;
}) {
  const userId = getUserIdFromToken();
  return fetcher(`${BASE_URL}/${userId}/intellectual-property`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** UPDATE HKI */
export function updateIntellectualProperty(
  id: number,
  data: { title: string; type: string; year: number }
) {
  return fetcher(`${BASE_URL}/intellectual-property/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/** DELETE HKI */
export function deleteIntellectualProperty(id: number) {
  return fetcher(`${BASE_URL}/intellectual-property/${id}`, {
    method: "DELETE",
  });
}

/* ======================================================
   INTELLECTUAL PROPERTY (ADMIN)
====================================================== */
export function addIntellectualPropertyByAdmin(
  userId: number,
  data: { title: string; type: string; year: number }
) {
  return fetcher(`${BASE_URL}/${userId}/intellectual-property`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
