// src/lib/apiTeam.ts

const API_URL = "http://localhost:4000/api/team";

/* =====================================================
   AUTH HEADER (TYPE SAFE)
===================================================== */
function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("token");
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}

/* =====================================================
   HANDLE RESPONSE
===================================================== */
async function handleResponse(res: Response) {
  const type = res.headers.get("content-type") || "";

  if (!res.ok) {
    const message = type.includes("json")
      ? (await res.json())?.error || JSON.stringify(await res.json())
      : await res.text();

    throw new Error(`Request failed (${res.status}): ${message}`);
  }

  return type.includes("json") ? res.json() : res.text();
}

/* =====================================================
   GET ALL PROJECTS (PUBLIC)
===================================================== */
export async function getAllProjects() {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  return handleResponse(res);
}

/* =====================================================
   CREATE PROJECT (JWT REQUIRED)
===================================================== */
export async function createProject(data: any) {
  const form = new FormData();

  form.append("teamTitle", data.teamTitle);
  form.append("teamMembers", JSON.stringify(data.teamMembers));

  data.teamMembers.forEach((m: any, i: number) => {
    if (m.imageFile instanceof File) {
      form.append("images", m.imageFile, `member-${i}.png`);
    }
  });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   ADD MEMBER (JWT REQUIRED)
===================================================== */
export async function addMember(projectId: number, member: any) {
  const form = new FormData();

  Object.keys(member).forEach((key) => {
    if (
      key !== "image" &&
      key !== "imageFile" &&
      member[key] != null
    ) {
      form.append(key, member[key]);
    }
  });

  if (member.imageFile instanceof File) {
    form.append("image", member.imageFile, "member.png");
  }

  const res = await fetch(`${API_URL}/${projectId}/member`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   UPDATE MEMBER (JWT REQUIRED)
===================================================== */
export async function updateMember(memberId: number, data: any) {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    if (
      key !== "image" &&
      key !== "imageFile" &&
      data[key] != null
    ) {
      form.append(key, data[key]);
    }
  });

  if (data.imageFile instanceof File) {
    form.append("image", data.imageFile, "update.png");
  }

  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: form,
  });

  return handleResponse(res);
}

/* =====================================================
   DELETE MEMBER (JWT REQUIRED)
===================================================== */
export async function deleteMember(memberId: number) {
  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}

/* =====================================================
   DELETE PROJECT (JWT REQUIRED)
===================================================== */
export async function deleteProject(projectId: number) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
}
