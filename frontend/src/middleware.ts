import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ambil token dari localStorage TIDAK BISA di server
  // SOLUSI: pakai cookie ATAU redirect paksa kalau tidak ada auth cookie

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // =========================
  // PROTEKSI ADMIN
  // =========================
  if (pathname.startsWith("/admin")) {
    if (!token || (role !== "admin" && role !== "superadmin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // =========================
  // PROTEKSI LECTURER
  // =========================
  if (pathname.startsWith("/lecturer")) {
    if (!token || role !== "dosen") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// JALANKAN HANYA UNTUK PATH INI
export const config = {
  matcher: ["/admin/:path*", "/lecturer/:path*"],
};
