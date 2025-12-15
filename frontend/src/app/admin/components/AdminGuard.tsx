"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // ❌ Belum login
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(user);

      // ❌ Bukan admin
      if (parsed.role !== "admin" && parsed.role !== "superadmin") {
        router.replace("/login");
      }
    } catch {
      // ❌ Data rusak
      localStorage.clear();
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
