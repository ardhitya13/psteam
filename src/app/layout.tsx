import "./globals.css";
import NavBar from "./components/Navbar";
import "flowbite";
import "flowbite-react";

export const metadata = {
  title: "PSTeam",
  description: "Website resmi PSTeam - Web, IoT, Mobile, dan AI Solution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logopsteam1.png" />
      </head>
      {/* Tambahkan padding-top agar konten tidak ketiban navbar fixed */}
      <body className="pt-[120px] bg-white">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
