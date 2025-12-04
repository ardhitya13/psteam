// src/lib/apiTeam.ts
const API_URL = "http://localhost:4000/api/team";

async function handleResponse(res: Response) {
  const type = res.headers.get("content-type") || "";

  if (!res.ok) {
    const text = type.includes("json")
      ? JSON.stringify(await res.json())
      : await res.text();

    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return type.includes("json") ? res.json() : res.text();
}

// =====================================
// GET ALL PROJECTS
// =====================================
export async function getAllProjects() {
  const res = await fetch(API_URL, { cache: "no-store" });
  return handleResponse(res);
}

// =====================================
// CREATE PROJECT  (JSON ONLY, NO FORM-DATA)
// =====================================
export async function createProject(data: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// =====================================
// ADD MEMBER  → POST /api/team/:id/member
// =====================================
export async function addMember(projectId: number, member: any) {
  const res = await fetch(`${API_URL}/${projectId}/member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });
  return handleResponse(res);
}

// =====================================
// UPDATE MEMBER  → PUT /api/team/member/:memberId
// =====================================
export async function updateMember(memberId: number, data: any) {
  // clone object
  const cleaned: any = { ...data };

  // remove forbidden fields (backend/prisma will fail otherwise)
  delete cleaned.id;
  delete cleaned.projectId;
  delete cleaned.category;
  delete cleaned.role;
  delete cleaned.teamMembers;
  delete cleaned.teammember;
  delete cleaned.teamMember;
  delete cleaned.__v;
  delete cleaned._id;

  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleaned),
  });

  return handleResponse(res);
}

// =====================================
// DELETE MEMBER  → DELETE /api/team/member/:memberId
// =====================================
export async function deleteMember(memberId: number) {
  const res = await fetch(`${API_URL}/member/${memberId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

// =====================================
// DELETE PROJECT  → DELETE /api/team/:id
// =====================================
export async function deleteProject(projectId: number) {
  const res = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
