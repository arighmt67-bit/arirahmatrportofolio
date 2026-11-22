export const OPEN_PROJECT = "portfolio:open-project";
export const FILTER_PILLAR = "portfolio:filter-pillar";
export const OPEN_PALETTE = "portfolio:open-palette";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT, { detail: id }));
}

export function filterPillar(pillar: string) {
  window.dispatchEvent(new CustomEvent(FILTER_PILLAR, { detail: pillar }));
  scrollToId("proyek");
}
