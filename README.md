PSTEAM Fullstack Project

Website resmi PSTEAM yang dikembangkan menggunakan Next.js (Frontend) serta Node.js + Express + Prisma (Backend).
Proyek ini merupakan bagian dari tugas mata kuliah Pemrograman Web – IF Malam 3A
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
│── backend/      → REST API + Prisma + Controllers
│── frontend/     → Next.js website
└── README.md

🔧 Backend Installation

Masuk ke folder backend:

cd backend


Install dependencies:

npm install

1. Setup Environment

Buat file:

backend/.env


Isi dengan:

DATABASE_URL="mysql://root:@localhost:3306/nama_database"
PORT=3001

2. Prisma Migration
npx prisma migrate dev
npx prisma generate

3. Jalankan Backend
npm run dev


Backend berjalan di:

http://localhost:3001

🌐 Frontend Installation

Masuk ke folder frontend:

cd frontend


Install dependencies:

npm install

1. Setup Environment

Buat file:

frontend/.env.local


Isi dengan:

NEXT_PUBLIC_API_URL=http://localhost:3001

2. Jalankan Frontend
npm run dev


Akses di:

http://localhost:3000

▶️ Development Notes

Untuk memulai editing halaman utama:

frontend/src/app/page.tsx


Next.js akan otomatis melakukan hot reload setiap ada perubahan.

📚 Learn More (Referensi)

Dokumentasi Next.js

Tutorial Interaktif Next.js

Repository Resmi Next.js di GitHub

🚀 Deploy on Vercel

Cara termudah untuk deploy frontend adalah menggunakan Vercel, platform resmi dari pembuat Next.js.

Dokumentasi:

https://vercel.com/docs