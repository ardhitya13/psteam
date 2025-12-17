"use client";

import { useRouter } from "next/navigation";

export const logout = (router?: ReturnType<typeof useRouter>) => {
  // hapus localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // hapus cookie
  document.cookie = "token=; Max-Age=0; path=/";
  document.cookie = "role=; Max-Age=0; path=/";

  if (router) {
    router.replace("/login");
  } else {
    window.location.href = "/login";
  }
};
