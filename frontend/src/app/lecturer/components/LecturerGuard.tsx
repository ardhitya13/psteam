"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LecturerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(user);

      if (parsed.role !== "dosen") {
        router.replace("/login");
      }
    } catch {
      localStorage.clear();
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
