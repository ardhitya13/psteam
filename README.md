# PSTEAM Fullstack Project  
**Kelompok 7 – Proyek PSTEAM**

Website resmi **PSTEAM (Polibatam Software Team)** yang dikembangkan sebagai proyek fullstack menggunakan **Next.js** pada sisi frontend serta **Node.js + Express + Prisma** pada sisi backend.  
Proyek ini dibuat untuk memenuhi tugas mata kuliah **PBL**.

**Program Studi** : D3 Teknik Informatika  
**Kelas**          : IF 3A Malam – Web  
**Kelompok**       : 7  
**Institusi**      : Politeknik Negeri Batam  

---

## 👥 Tim Pengembang (Kelompok 7)

| No | Nama                    | NIM         | Program Studi        | Kelas             | Peran |
|----|-------------------------|-------------|----------------------|-------------------|-------|
| 1  | Arifah Husaini          | 3312411097  | Teknik Informatika   | IF 3A Malam – Web | Ketua |
| 2  | Anggun Salsa Faradita   | 3312411102  | Teknik Informatika   | IF 3A Malam – Web | Anggota |
| 3  | Ardhitya Danur Siswondo | 3312411099  | Teknik Informatika   | IF 3A Malam – Web | Anggota |
| 4  | Farhan Rasyid           | 3312411075  | Teknik Informatika   | IF 3A Malam – Web | Anggota |

---

## 🧩 Teknologi yang Digunakan

### Frontend
- **Next.js 15.5.4** (App Router)
- TypeScript
- Tailwind CSS
- AOS Animation

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- TypeScript
- JSON Web Token (JWT)

---

## 📁 Struktur Folder Proyek

psteam/
│── backend/ # REST API, Prisma, Controller, Middleware
│── frontend/ # Next.js (Admin, Dosen, Public)
└── README.md

yaml
Copy code

---

## 🔧 Instalasi Backend

Masuk ke folder backend:

```bash
cd backend
Install dependency:

bash
Copy code
npm install
1️⃣ Konfigurasi Environment
Buat file:

bash
Copy code
backend/.env
Isi dengan:

env
Copy code
DATABASE_URL="mysql://root:@localhost:3306/dbpsteam"
JWT_SECRET=your_secret_key
PORT=4000
2️⃣ Migrasi Database (Prisma)
bash
Copy code
npx prisma migrate dev
npx prisma generate
3️⃣ Menjalankan Backend
bash
Copy code
npm run dev
Backend akan berjalan di:

arduino
Copy code
http://localhost:4000
🌐 Instalasi Frontend
Masuk ke folder frontend:

bash
Copy code
cd frontend
Install dependency:

bash
Copy code
npm install
1️⃣ Konfigurasi Environment
Buat file:

bash
Copy code
frontend/.env.local
Isi dengan:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:4000
2️⃣ Menjalankan Frontend
bash
Copy code
npm run dev
Frontend dapat diakses melalui:

arduino
Copy code
http://localhost:3000
Versi Next.js yang digunakan:

vbnet
Copy code
Next.js 15.5.4
🔐 Sistem Autentikasi & Hak Akses
Aplikasi PSTEAM memiliki 3 jenis pengguna:

Superadmin

Mengelola seluruh akun (Admin & Dosen)

Akses penuh sistem

Admin

Mengelola akun Dosen

Mengelola data tertentu

Dosen

Mengelola profil dan data akademik pribadi

Keamanan sistem menggunakan:

JWT (Backend)

Cookie & Middleware Next.js (Frontend)

▶️ Catatan Pengembangan
File utama frontend:

css
Copy code
frontend/src/app/page.tsx
Sistem menggunakan hot reload otomatis saat development.

Backend dan frontend dijalankan secara terpisah.

📚 Referensi
https://nextjs.org/docs

https://www.prisma.io/docs

https://expressjs.com

https://vercel.com/docs

🚀 Deployment
Frontend: Vercel

Backend: Railway / Render / VPS

Dokumentasi deployment Next.js:
https://nextjs.org/docs/app/building-your-application/deploying

📌 Catatan Penting
File .env tidak boleh di-push ke GitHub

Folder node_modules tidak di-commit

Gunakan .gitignore untuk menjaga keamanan proyek

© 2025 — PSTEAM | Kelompok 7
Program Studi D3 Teknik Informatika
Politeknik Negeri Batam