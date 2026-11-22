# arirahmatrportofolio

Portofolio Ari Rahmat Romadhon: 15 proyek submission Dicoding di bidang DevOps, Cloud, Security, dan Backend.

Live: https://arirahmatrportofolio.vercel.app

## Isi

- Kartu proyek dengan filter per bidang. Detail proyek berisi cara kerja, bukti di repo, batasan, dan potongan kode asli.
- Simulator pipeline CI/CD yang mengikuti `ci.yml` dan `release.yml` di repo [forum-api](https://github.com/arighmt67-bit/forum-api). Simulasi berjalan di browser, tidak memanggil runner.
- Pencarian cepat (Ctrl/⌘ + K), tema terang dan gelap.
- `/resume.json`: data profil dan proyek dalam format JSON.

Isi proyek dicek ke repo GitHub pada 22 November 2026. Data ada di `src/data/projects.ts`, dan potongan kode di `src/data/snippets.ts` disalin dari repo sumber tanpa diubah.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi, semua halaman statis
```

Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.
