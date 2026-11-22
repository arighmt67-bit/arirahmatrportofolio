"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "@/data/projects";
import { snippets } from "@/data/snippets";
import CodeBlock from "./CodeBlock";
import PillarTag from "./PillarTag";
import { CloseIcon } from "./icons";

type Tab = "ringkasan" | "cara" | "bukti" | "kode";

const tabLabel: Record<Tab, string> = {
  ringkasan: "Ringkasan",
  cara: "Cara kerja",
  bukti: "Bukti & batasan",
  kode: "Kode asli",
};

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Alur">
      {steps.map((s, k) => (
        <li key={s} className="flex items-center gap-2">
          <span className="chip">{s}</span>
          {k < steps.length - 1 && (
            <span aria-hidden="true" className="text-subtle">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>("ringkasan");
  const tabs: Tab[] = ["ringkasan", "cara", "bukti", ...(project?.snippet ? (["kode"] as Tab[]) : [])];

  useEffect(() => {
    const d = ref.current;
    if (project && d && !d.open) d.showModal();
  }, [project]);

  function close() {
    ref.current?.close();
  }

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    const i = tabs.indexOf(tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(tabs[next]);
    document.getElementById(`tab-${tabs[next]}`)?.focus();
  }

  const snip = project?.snippet ? snippets[project.snippet] : undefined;

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClose={() => {
        setTab("ringkasan");
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {project && (
        <div className="dialog-body">
          <div className="flex items-start gap-4 border-b border-line p-5 md:p-7">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-3">
                {project.pillars.map((p) => (
                  <PillarTag key={p} pillar={p} />
                ))}
              </div>
              <h3 id="dialog-title" className="mt-3 font-display text-2xl font-extrabold leading-tight md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-subtle">Dicoding · {project.course}</p>
            </div>
            <button type="button" onClick={close} className="icon-btn" aria-label="Tutup detail proyek">
              <CloseIcon />
            </button>
          </div>
          <div role="tablist" aria-label="Detail proyek" className="flex gap-1 overflow-x-auto border-b border-line px-4 py-2 md:px-6">
            {tabs.map((t) => (
              <button
                key={t}
                id={`tab-${t}`}
                type="button"
                role="tab"
                aria-selected={tab === t}
                aria-controls={`panel-${t}`}
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={onTabKey}
                className="tab-btn"
              >
                {tabLabel[t]}
              </button>
            ))}
          </div>
          <div
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            tabIndex={0}
            className="flex-1 overflow-y-auto p-5 leading-relaxed md:p-7"
          >
            {tab === "ringkasan" && (
              <div className="space-y-6">
                <p className="text-lg text-muted">{project.summary}</p>
                {project.flow && (
                  <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Alur</p>
                    <Flow steps={project.flow} />
                  </div>
                )}
                {project.courses && (
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Kelas</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted">
                      {project.courses.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Teknologi</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {tab === "cara" && (
              <ol className="space-y-4">
                {project.how.map((h, k) => (
                  <li key={k} className="flex gap-4">
                    <span className="font-mono text-sm text-accent">{String(k + 1).padStart(2, "0")}</span>
                    <span className="text-muted">{h}</span>
                  </li>
                ))}
              </ol>
            )}
            {tab === "bukti" && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle">Bukti di repo</p>
                  <ul className="space-y-3">
                    {project.proof.map((p, k) => (
                      <li key={k} className="flex gap-3 text-muted">
                        <span aria-hidden="true" className="text-[color:var(--ok)]">
                          ✓
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--warn)]">Batasan</p>
                  <p className="mt-2 text-muted">{project.limits}</p>
                </div>
              </div>
            )}
            {tab === "kode" && snip && (
              <div className="space-y-3">
                <p className="text-sm text-subtle">Potongan dari {snip.file} di repo, tanpa diubah.</p>
                <CodeBlock file={snip.file} body={snip.body} />
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 md:px-7">
            <span className="font-mono text-xs text-subtle">{project.repo.label}</span>
            <a href={project.repo.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Buka di GitHub ↗
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
