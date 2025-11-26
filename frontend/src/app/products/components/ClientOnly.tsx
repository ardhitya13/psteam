"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  // ❗ Gunakan requestAnimationFrame agar 100% sinkron dengan render client
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isClient) return null;

  return <>{children}</>;
}
