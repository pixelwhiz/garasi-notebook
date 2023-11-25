# Garasi Notebook App

Ini adalah aplikasi fullstack yang memberikan layanan service center untuk perbaikan dan perawatan perangkat notebook. Aplikasi ini menggunakan teknologi modern pada frontend dan backend untuk memberikan pengalaman pengguna yang optimal.

## Teknologi yang Digunakan

### Frontend

- **Vue 3:** Sebuah framework JavaScript yang powerful untuk membangun antarmuka pengguna.
- **Tailwind CSS:** Sebuah framework CSS yang sangat customizable dan utility-first.
- **DaisyUI:** Komponen UI tambahan untuk Tailwind CSS.

### Backend

- **JavaScript:** Bahasa pemrograman utama untuk logika backend.
- **Express:** Framework Node.js yang minimal dan fleksibel untuk membangun aplikasi web.
- **MySQL:** Sistem manajemen basis data relasional yang digunakan untuk menyimpan data aplikasi.
- **Sequelize:** ORM (Object-Relational Mapping) untuk Node.js yang kompatibel dengan MySQL dan menyederhanakan interaksi dengan database.

## Cara Menjalankan Aplikasi

### Persiapan

1. Pastikan Node.js dan npm terinstal di sistem Anda.
2. Pastikan MySQL server telah terinstal dan berjalan.

### Instalasi

1. Clone repositori ini ke dalam direktori lokal:

    ```bash
    git clone https://github.com/pixelwhiz/garasinotebook.git
    ```

2. Masuk ke direktori proyek:

    ```bash
    cd garasi-notebook-service-center
    ```

3. Instal dependensi frontend:

    ```bash
    cd frontend
    npm install
    ```

4. Instal dependensi backend:

    ```bash
    cd ../backend
    npm install
    ```

### Konfigurasi Database

1. Buat database MySQL untuk aplikasi ini.
2. Salin file `.env.example` menjadi `.env` di dalam direktori `backend` dan atur konfigurasi database sesuai dengan pengaturan MySQL Anda.

### Menjalankan Aplikasi

1. Jalankan backend:

    ```bash
    cd backend
    npm start
    ```

2. Jalankan frontend:

    ```bash
    cd ../frontend
    npm run dev
    ```

Aplikasi akan diakses pada `http://localhost:5173/` secara default.

## Lisensi

[MIT License](LICENSE.md)
