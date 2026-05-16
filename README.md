# 🎬 MovieBrutalism — Mobile Movie App

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Sebuah aplikasi mobile berbasis **React Native (Expo)** untuk menjelajahi informasi film terkini menggunakan API dari **The Movie Database (TMDB)**. Aplikasi ini dirancang dengan konsep desain **Neubrutalism** yang berani, kontras tinggi, menggunakan garis tepi (*border*) tebal, serta bayangan tegas (*hard shadows*) terinspirasi dari antarmuka platform modern seperti Saweria.

---

## ✨ Fitur Utama (User Stories)

Aplikasi ini diimplementasikan berdasarkan standar penilaian *technical assessment*:
* **Discover by Genre:** Menampilkan daftar *grid* kategori genre film yang interaktif dan penuh warna.
* **Endless Scrolling:** Fitur *infinite scroll* otomatis pada daftar film per genre dan ulasan pengguna demi performa memori yang optimal.
* **Movie Detail & Synopsis:** Menyajikan informasi komprehensif, rating, serta sinopsis film dalam satu halaman terintegrasi.
* **YouTube Trailer Integration:** Menonton *trailer* resmi film secara langsung di dalam aplikasi menggunakan library native webview player.
* **User Reviews Integration:** Mengambil ulasan asli dari penonton global langsung dari server TMDB.
* **Robust Error Handling (Negative Cases):** Dilengkapi penanganan skenario *error* seperti kegagalan token API (401), tidak ada koneksi internet, hingga kondisi data kosong (*empty states*) dengan UI bertema Neubrutalism.

---

## 🛠️ Stack Teknologi & Library

* **Framework:** React Native (Expo)
* **Bahasa Pemrograman:** TypeScript
* **Styling Engine:** NativeWind (Tailwind CSS v4)
* **HTTP Client:** Axios
* **Navigation:** React Navigation (Native Stack)
* **Icon Pack:** `@expo/vector-icons` (FontAwesome, MaterialCommunityIcons)
* **Video Player:** `react-native-youtube-iframe` & `react-native-webview`

---

## 🚀 Langkah Instalasi & Menjalankan Proyek

Pastikan Anda sudah menginstal **Node.js (LTS v20/v22)** dan aplikasi **Expo Go** di perangkat Android atau iOS Anda.

### 1. Klon Repositori
```bash
git clone https://github.com/ibrahimahmads/MovieBrutalismNative.git
cd nama-repo-kamu
npm install
npx expo start 
