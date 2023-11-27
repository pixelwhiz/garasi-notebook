# Garasi Notebook - Fullstack App

Garasi Notebook adalah aplikasi fullstack yang dirancang untuk memudahkan manajemen dan layanan pelanggan terkait perbaikan dan pemeliharaan notebook. Aplikasi ini dibangun dengan teknologi modern di sisi frontend dan backend.

### Teknologi Utama

- Vue 3: _Progressive JavaScript Framework_
- Tailwind CSS: _A utility-first CSS framework_
- DaisyUI: _Component Library for Tailwind CSS_

### Instalasi dan Penggunaan

1. **Clone repositori ini:**

    ```bash
    git clone https://github.com/pixelwhiz/garasinotebook.git
    cd garasinotebook/frontend
    ```

2. **Install dependensi:**

    ```bash
    npm install
    ```

3. **Jalankan server pengembangan:**

    ```bash
    npm run dev
    ```

    Frontend akan berjalan di `http://localhost:5173/`.

## Backend

### Teknologi Utama
- ExpressJS: _Fast, unopinionated, minimalist web framework for Node.js_
- MySQL: _Relational Database Management System_
- Sequelize: _Promise-based Node.js ORM_

### Instalasi dan Penggunaan

1. **Clone repositori ini:**

    ```bash
    git clone https://github.com/pixelwhiz/garasinotebook.git
    cd garasinotebook/backend
    ```

2. **Install dependensi:**

    ```bash
    npm install
    ```

3. **Konfigurasi database:**

    Edit file `config/db.config.js` sesuai dengan pengaturan database MySQL Anda.

4. **Jalankan migrasi database:**

    ```bash
    npm run migrate
    ```

5. **Jalankan server:**

    ```bash
    npm start
    ```

    Backend akan berjalan di `http://localhost:3000/`.

## Lingkungan Pengembangan

- Node.js v14.x atau versi terbaru.
- MySQL server.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buat _fork_ dan kirim _pull request_. Pastikan untuk mengikuti pedoman kontribusi yang ada.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE.md](LICENSE.md) untuk detailnya.
