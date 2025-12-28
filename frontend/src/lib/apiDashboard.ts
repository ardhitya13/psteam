const BASE_URL = "http://localhost:4000";

/* =========================
   AUTH HEADER
========================= */
function authHeader(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =========================
   SAFE FETCH
========================= */
async function safeFetch(url: string, useAuth = true) {
  try {
    const res = await fetch(url, {
      headers: useAuth ? authHeader() : {},
    });

    if (!res.ok) return [];

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch {
    return [];
  }
}

/* =========================
   DASHBOARD DATA
========================= */
export async function fetchDashboardData() {
  const [
    pendingProjects,
    approvedProjects,
    trainings,
    users,
    lecturersPublic,
  ] = await Promise.all([
    safeFetch(`${BASE_URL}/api/submissions/pending`),
    safeFetch(`${BASE_URL}/api/submissions/approved`),
    safeFetch(`${BASE_URL}/api/training`, false),
    safeFetch(`${BASE_URL}/api/users`),
    safeFetch(`${BASE_URL}/api/public/lecturer`, false),
  ]);

  /* =========================
     USER ROLE COUNT
  ========================= */
  const userStats = {
    total: users.length,
    admin: users.filter((u: any) => u.role === "admin").length,
    dosen: users.filter((u: any) => u.role === "dosen").length,
    umum: users.filter((u: any) => u.role === "user").length,
  };

  /* =========================
     TRAINING STATUS
  ========================= */
  const trainingStats = {
    total: trainings.length,
    approved: trainings.filter((t: any) => t.status === "approved").length,
    pending: trainings.filter((t: any) => t.status !== "approved").length,
  };

  /* =========================
     PORTOFOLIO DOSEN
  ========================= */
  let research = 0;
  let communityService = 0;
  let scientificWork = 0;
  let intellectualProperty = 0;

  const lecturerStats = lecturersPublic.map((l: any) => {
    const p = l.lecturerprofile || {};

    const r = p.research?.length || 0;
    const c = p.communityservice?.length || 0;
    const s = p.scientificwork?.length || 0;
    const h = p.intellectualproperty?.length || 0;

    research += r;
    communityService += c;
    scientificWork += s;
    intellectualProperty += h;

    return {
      name: l.name,
      research: r,
      community: c,
      publication: s,
      hki: h,
    };
  });

  return {
    pendingProjects: pendingProjects.length,
    approvedProjects: approvedProjects.length,
    totalProjects: pendingProjects.length + approvedProjects.length,

    trainings: trainingStats,
    users: userStats,

    research,
    communityService,
    scientificWork,
    intellectualProperty,

    lecturerStats,
  };
}
