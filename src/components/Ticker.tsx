import { projects } from "@/data/projects";

function topTech(limit: number) {
  const counts = new Map<string, number>();
  for (const p of projects) for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([t]) => t);
}

export default function Ticker() {
  const items = topTech(22);
  return (
    <div className="ticker" role="region" aria-label="Teknologi yang dipakai di proyek">
      <div className="ticker-track">
        {[...items, ...items].map((t, k) => (
          <span key={`${t}-${k}`} className="ticker-item" aria-hidden={k >= items.length ? "true" : undefined}>
            <span className="text-accent">• </span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
