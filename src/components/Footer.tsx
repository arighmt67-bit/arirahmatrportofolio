import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-4 py-8 text-sm text-subtle md:flex-row md:items-center md:justify-between">
        <p>© 2026 {site.name}. Isi proyek dicek ke repo GitHub pada 22 November 2026.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center hover:text-ink">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center hover:text-ink">
            LinkedIn
          </a>
          <a href="#beranda" className="inline-flex min-h-8 items-center hover:text-ink">
            ↑ Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
