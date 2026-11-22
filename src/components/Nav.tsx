"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { OPEN_PALETTE } from "@/lib/events";
import { toggleTheme } from "@/lib/theme";
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./icons";

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = ["beranda", ...navLinks.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav-glass fixed inset-x-0 top-0 z-40">
      <nav aria-label="Navigasi utama" className="container-x flex h-16 items-center gap-3">
        <a href="#beranda" className="font-display text-lg font-extrabold tracking-tight">
          Ari Rahmat<span className="text-accent">.</span>
        </a>
        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className={`nav-link ${active === l.id ? "is-active" : ""}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
            className="icon-btn gap-2 px-3"
            aria-label="Cari proyek ⌘K"
          >
            <SearchIcon />
            <kbd className="hidden font-mono text-xs sm:inline">⌘K</kbd>
          </button>
          <button type="button" onClick={toggleTheme} className="icon-btn" aria-label="Ganti tema terang atau gelap">
            <SunIcon className="theme-sun" />
            <MoonIcon className="theme-moon" />
          </button>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm hidden sm:inline-flex"
          >
            CV ↗
          </a>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>
      {open && (
        <div id="menu-mobile" className="border-t border-line lg:hidden">
          <ul className="container-x grid gap-1 py-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-muted hover:bg-surface-2 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
