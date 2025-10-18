import React from "react";
import Logincard from "./components/LoginCard";

export const metadata = {
  title: "Login - PSteam",
};

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/campus/fotopoltek.jpg')", // ganti sesuai nama file kamu
      }}
    >
      <div className="bg-white/95 rounded-2xl shadow-xl p-10 w-[380px] max-w-full">
        <Logincard />
      </div>
    </main>
  );
}
