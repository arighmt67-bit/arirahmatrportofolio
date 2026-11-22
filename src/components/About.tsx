import { pillarMeta, pillarOrder, projects } from "@/data/projects";
import { repos, site } from "@/data/site";
import { PillarButton } from "./ClientButtons";

export default function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="container-x py-24 md:py-28">
      <p className="eyebrow">Tentang • (01)</p>
      <h2 id="tentang-title" className="section-title">
        Belajar lewat submission, dibuktikan di repo.
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Saya {site.name}, tinggal di Tangerang. Kemampuan teknis saya banyak terbentuk lewat learning path
            Dicoding: DevOps, Google Cloud, serta Back-End JavaScript dan Python.
          </p>
          <p>
            Semua proyek di halaman ini adalah submission kelas, bukan sistem produksi. Karena itu setiap proyek
            punya catatan batasan: bagian yang belum terbukti, URL yang sudah tidak aktif, atau pengaturan yang
            sengaja dimatikan.
          </p>
        </div>
        <div className="card p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">Repositori kode</p>
          <ul className="mt-4 divide-y divide-[color:var(--line)]">
            {repos.map((r) => (
              <li key={r.name}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block font-mono text-sm text-ink group-hover:text-accent">{r.name}</span>
                    <span className="mt-0.5 block text-sm text-subtle">{r.note}</span>
                  </span>
                  <span aria-hidden="true" className="text-subtle group-hover:text-accent">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillarOrder.map((p, i) => {
          const count = projects.filter((x) => x.pillars.includes(p)).length;
          return (
            <article key={p} className="card flex flex-col p-6">
              <p className="font-mono text-xs text-subtle">BIDANG 0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold" style={{ color: `var(--p-${p})` }}>
                {pillarMeta[p].label}.
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{pillarMeta[p].blurb}</p>
              <PillarButton pillar={p} count={count} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
