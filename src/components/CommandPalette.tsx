"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { pillarMeta, projects } from "@/data/projects";
import { navLinks, site } from "@/data/site";
import { OPEN_PALETTE, openProject, scrollToId } from "@/lib/events";
import { toggleTheme } from "@/lib/theme";
import { SearchIcon } from "./icons";

interface Item {
  id: string;
  group: "Bagian" | "Proyek" | "Aksi";
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

export default function CommandPalette() {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const items = useMemo<Item[]>(
    () => [
      ...navLinks.map((l) => ({
        id: `nav-${l.id}`,
        group: "Bagian" as const,
        label: l.label,
        hint: `#${l.id}`,
        keywords: l.label,
        run: () => scrollToId(l.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        group: "Proyek" as const,
        label: p.title,
        hint: p.pillars.map((x) => pillarMeta[x].label).join(" · "),
        keywords: `${p.title} ${p.course} ${p.tech.join(" ")} ${p.pillars.join(" ")}`,
        run: () => {
          scrollToId("proyek");
          openProject(p.id);
        },
      })),
      {
        id: "a-theme",
        group: "Aksi",
        label: "Ganti tema terang atau gelap",
        hint: "tema",
        keywords: "theme dark light gelap terang",
        run: toggleTheme,
      },
      {
        id: "a-email",
        group: "Aksi",
        label: "Salin alamat email",
        hint: site.email,
        keywords: "email kontak copy salin",
        run: () => void navigator.clipboard?.writeText(site.email).catch(() => {}),
      },
      {
        id: "a-github",
        group: "Aksi",
        label: "Buka GitHub",
        hint: "arighmt67-bit",
        keywords: "github repo kode",
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [],
  );

  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => i.keywords.toLowerCase().includes(q) || i.label.toLowerCase().includes(q)) : items;
  const current = Math.min(index, Math.max(results.length - 1, 0));

  useEffect(() => {
    function open() {
      setQuery("");
      setIndex(0);
      const d = ref.current;
      if (d && !d.open) d.showModal();
      inputRef.current?.focus();
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (ref.current?.open) ref.current.close();
        else open();
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, open);
    };
  }, []);

  function select(item: Item | undefined) {
    if (!item) return;
    ref.current?.close();
    window.setTimeout(item.run, 0);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((current + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[current]);
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-${current}`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  let lastGroup = "";

  return (
    <dialog
      ref={ref}
      className="project-dialog !w-[min(620px,calc(100vw-24px))] !self-start mt-[12vh]"
      aria-label="Pencarian cepat"
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <SearchIcon className="text-subtle" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Cari proyek, alat, atau bagian…"
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-subtle"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results.length ? `cmd-${current}` : undefined}
          aria-autocomplete="list"
          aria-label="Kata kunci"
        />
        <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-subtle sm:inline">
          Esc
        </kbd>
      </div>
      <ul id="cmd-list" role="listbox" aria-label="Hasil" className="max-h-[52vh] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-subtle">Tidak ada hasil.</li>}
        {results.map((item, k) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && (
                <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle" aria-hidden="true">
                  {header}
                </p>
              )}
              <div
                id={`cmd-${k}`}
                role="option"
                aria-selected={k === current}
                onMouseMove={() => setIndex(k)}
                onClick={() => select(item)}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 ${
                  k === current ? "bg-surface-2 text-ink" : "text-muted"
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="shrink-0 font-mono text-xs text-subtle">{item.hint}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
