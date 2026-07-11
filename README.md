# Katalog Buku Preloved (versi sederhana)

Versi yang dipangkas jadi minimal: cuma 1 komponen (`App.jsx`), tanpa custom
hook, tanpa file terpisah untuk tiap bagian. Cocok kalau kamu masih belajar
dasar React dan mau semua logic kelihatan di satu tempat.

## Struktur folder

```
src/
  App.jsx   -> semua logic & tampilan ada di sini
  App.css   -> semua styling
  main.jsx  -> entry point (jarang perlu diubah)
```

## Sebelum dipakai, ganti dua hal ini di `src/App.jsx`

1. `books` (baris atas) — ganti dengan buku kamu yang sebenarnya.
2. `NOMOR_WA_PENJUAL` — ganti dengan nomor WhatsApp kamu, format
   internasional tanpa `+`/`0` di depan (contoh: `6281234567890`).

## Cara jalan di lokal

```bash
npm install
npm run dev
```

## Cara deploy gratis (Vercel)

1. Push ke GitHub.
2. Buka [vercel.com](https://vercel.com) → Add New Project → pilih repo.
3. Biarkan preset default ("Vite") → Deploy.

## Cara kerja checkout

Tidak ada backend. Saat form disubmit, aplikasi menyusun ringkasan pesanan
jadi satu pesan, lalu membuka tab baru ke `wa.me` dengan pesan itu sudah
terisi otomatis.

## Checklist tugas

- React ✅ (Vite + JSX)
- Komponen ✅ (satu komponen `App`, cukup untuk skala project ini)
- useState ✅ dipakai untuk: isi keranjang, tampil/tidaknya form, tiap input
  form, dan status "sudah terkirim"
- Interaktif input → output ✅ (tambah ke keranjang, isi form → pesan WA)
