PSTEAM Fullstack Project

Website resmi PSTEAM yang dikembangkan menggunakan Next.js (Frontend) dan Node.js + Express + Prisma (Backend).
Proyek ini merupakan bagian dari tugas mata kuliah Pemrograman Web – IF MALAM 3A
Program Studi: D3 Teknik Informatika – Politeknik Negeri Batam

👥 Team Members
No	Nama	NIM	Study Program	Keterangan
1	Arifah Husaini	3312411097	Teknik Informatika	Ketua Tim
2	Anggun Salsa Faradita	3312411102	Teknik Informatika	Anggota
3	Ardhitya Danur Siswondo	3312411099	Teknik Informatika	Anggota
4	Farhan Rasyid	3312411075	Teknik Informatika	Anggota
🧩 Tech Stack
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

AOS Animation

Backend

Node.js + Express

Prisma ORM

MySQL

TypeScript

📁 Folder Structure
psteam/
│── backend/     → REST API + Prisma + Controllers
│── frontend/    → Next.js website
└── README.md

🔧 1. Backend Installation

Masuk ke folder backend:

cd backend

Install dependencies
npm install

Setup environment

Buat file:

backend/.env


Isi:

DATABASE_URL="mysql://root:@localhost:3306/nama_database"
PORT=3001

Prisma migration
npx prisma migrate dev
npx prisma generate

Jalankan backend
npm run dev


Backend berjalan di:

http://localhost:3001

🌐 2. Frontend Installation

Masuk ke folder frontend:

cd frontend

Install dependencies
npm install

Setup Environment

Buat file:

frontend/.env.local


Isi:

NEXT_PUBLIC_API_URL=http://localhost:3001

Jalankan frontend
npm run dev


Akses di:

http://localhost:3000

▶️ Development Notes

Kamu dapat mulai mengubah tampilan halaman utama di:

frontend/src/app/page.tsx


Next.js akan otomatis melakukan hot reload ketika file diubah.

📚 Learn More (Referensi)

Dokumentasi Next.js

Tutorial Interaktif Next.js

Repository Resmi Next.js di GitHub

🚀 Deploy on Vercel

Cara paling mudah untuk deploy frontend adalah menggunakan Vercel, platform resmi pembuat Next.js.

Dokumentasi deploy:
https: vercel.com/docs (hapus spasi setelah paste)
