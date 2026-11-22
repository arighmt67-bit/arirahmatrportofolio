"use client";

import { useState } from "react";
import type { Pillar } from "@/data/projects";
import { filterPillar, openProject } from "@/lib/events";

export function PillarButton({ pillar, count }: { pillar: Pillar; count: number }) {
  return (
    <button type="button" onClick={() => filterPillar(pillar)} className="btn btn-ghost btn-sm mt-6 self-start">
      Lihat {count} proyek →
    </button>
  );
}

export function ProjectChip({ id, label }: { id: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => openProject(id)}
      className="chip text-left transition-colors hover:border-[color:var(--accent)] hover:text-ink"
    >
      {label}
    </button>
  );
}

export function CopyButton({ text, label = "Salin" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard tidak tersedia */
    }
  }
  return (
    <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-live="polite">
      {done ? "Tersalin ✓" : label}
    </button>
  );
}
