"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { pillarMeta, pillarOrder, projectById, projects, type Pillar, type Project } from "@/data/projects";
import { FILTER_PILLAR, OPEN_PROJECT } from "@/lib/events";
import PillarTag from "./PillarTag";

const ProjectDialog = dynamic(() => import("./ProjectDialog"), { ssr: false });

type Filter = "semua" | Pillar;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  const shown = project.tech.slice(0, 4);
  const more = project.tech.length - shown.length;
  return (
    <article className="card flex flex-col p-6 transition-colors hover:border-[color:var(--subtle)]">
      <div className="flex flex-wrap gap-3">
        {project.pillars.map((p) => (
          <PillarTag key={p} pillar={p} />
        ))}
      </div>
      <h3 className="mt-4 font-display text-xl font-extrabold leading-snug">{project.title}</h3>
      <p className="mt-2 font-mono text-xs text-subtle">{project.course}</p>
      <p className="mt-4 flex-1 leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Teknologi">
        {shown.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
        {more > 0 && <li className="chip">+{more}</li>}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => onOpen(project.id)} className="btn btn-primary btn-sm">
          Detail
          <span className="sr-only"> {project.title}</span>
        </button>
        <a href={project.repo.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          Repo ↗<span className="sr-only"> {project.title}</span>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("semua");
  const [activeId, setActiveId] = useState<string | null>(null);

  const onOpen = useCallback((id: string) => setActiveId(id), []);

  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<Pillar>).detail);
    const onProject = (e: Event) => setActiveId((e as CustomEvent<string>).detail);
    window.addEventListener(FILTER_PILLAR, onFilter);
    window.addEventListener(OPEN_PROJECT, onProject);
    const warm = window.setTimeout(() => void import("./ProjectDialog"), 3000);
    return () => {
      window.clearTimeout(warm);
      window.removeEventListener(FILTER_PILLAR, onFilter);
      window.removeEventListener(OPEN_PROJECT, onProject);
    };
  }, []);

  const list = filter === "semua" ? projects : projects.filter((p) => p.pillars.includes(filter));
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "semua", label: "Semua", count: projects.length },
    ...pillarOrder.map((p) => ({
      id: p,
      label: pillarMeta[p].label,
      count: projects.filter((x) => x.pillars.includes(p)).length,
    })),
  ];

  return (
    <section id="proyek" aria-labelledby="proyek-title" className="container-x py-24 md:py-28">
      <p className="eyebrow">Proyek • (03)</p>
      <h2 id="proyek-title" className="section-title">
        Proyek submission Dicoding.
      </h2>
      <p className="section-lead">
        Pilih bidang untuk menyaring. Buka detail untuk melihat cara kerja, bukti di repo, batasan, dan potongan
        kode aslinya.
      </p>
      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Saring berdasarkan bidang">
        {filters.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={filter === x.id}
            onClick={() => setFilter(x.id)}
            className="filter-btn"
          >
            {x.label}
            <span className="font-mono text-xs opacity-70">{x.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {list.length} proyek
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
      {activeId && <ProjectDialog project={projectById[activeId] ?? null} onClose={() => setActiveId(null)} />}
    </section>
  );
}
