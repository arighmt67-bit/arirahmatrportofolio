import { pillarMeta, pillarOrder, projects } from "@/data/projects";

function toolsFor(pillar: (typeof pillarOrder)[number]) {
  const counts = new Map<string, number>();
  for (const p of projects) {
    if (!p.pillars.includes(pillar)) continue;
    for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export default function Skills() {
  return (
    <section id="keahlian" aria-labelledby="keahlian-title" className="border-y border-line bg-mist">
      <div className="container-x py-24 md:py-28">
        <p className="eyebrow">Keahlian • (02)</p>
        <h2 id="keahlian-title" className="section-title">
          Alat yang benar-benar dipakai di proyek.
        </h2>
        <p className="section-lead">
          Dihitung otomatis dari daftar teknologi setiap proyek. Angka di samping alat adalah jumlah proyek yang
          memakainya, bukan tingkat penguasaan.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {pillarOrder.map((p) => (
            <article key={p} className="card p-6">
              <h3 className="font-display text-xl font-extrabold" style={{ color: `var(--p-${p})` }}>
                {pillarMeta[p].label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Alat untuk ${pillarMeta[p].label}`}>
                {toolsFor(p).map(([tool, n]) => (
                  <li key={tool} className="chip">
                    {tool}
                    {n > 1 && <span className="text-subtle">×{n}</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
