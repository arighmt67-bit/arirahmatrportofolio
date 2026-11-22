import type { CSSProperties } from "react";
import { pillarMeta, type Pillar } from "@/data/projects";

export default function PillarTag({ pillar }: { pillar: Pillar }) {
  return (
    <span className="pillar-tag" style={{ "--c": `var(--p-${pillar})` } as CSSProperties}>
      {pillarMeta[pillar].label}
    </span>
  );
}
