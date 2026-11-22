"use client";

import { useEffect, useState } from "react";

const HOLD = 30;
const PAUSE = 6;

function frame(words: string[], tick: number) {
  const spans = words.map((w) => 2 * w.length + HOLD + PAUSE);
  const total = spans.reduce((a, b) => a + b, 0);
  let x = tick % total;
  let i = 0;
  while (x >= spans[i]) {
    x -= spans[i];
    i += 1;
  }
  const word = words[i];
  const len = word.length;
  if (x <= len) return word.slice(0, x);
  if (x <= len + HOLD) return word;
  if (x <= 2 * len + HOLD) return word.slice(0, 2 * len + HOLD - x);
  return "";
}

export default function Typewriter({ words }: { words: string[] }) {
  const [tick, setTick] = useState(words[0].length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 70);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {frame(words, tick)}
        <span className="caret" />
      </span>
    </>
  );
}
