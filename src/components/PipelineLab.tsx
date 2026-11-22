"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "run" | "ok" | "fail" | "warn" | "skip";
type Done = "ok" | "fail" | "warn";
type Job = "security" | "test" | "release";
type ScenarioId = "pr" | "secret" | "vuln" | "test" | "tag";
type Tone = "ok" | "fail" | "warn" | "info" | "dim" | "plain";

interface Step {
  id: string;
  job: Job;
  name: string;
  detail: string;
}

interface Line {
  job: Job;
  text: string;
  tone: Tone;
}

const REPO = "https://github.com/arighmt67-bit/forum-api/blob/master/.github/workflows";

const jobs: { id: Job; name: string; file: string }[] = [
  { id: "security", name: "security-scan", file: "ci.yml" },
  { id: "test", name: "test", file: "ci.yml" },
  { id: "release", name: "build & push", file: "release.yml" },
];

const steps: Step[] = [
  { id: "s-checkout", job: "security", name: "Checkout", detail: "actions/checkout@v4" },
  { id: "gitleaks", job: "security", name: "Gitleaks", detail: "secret scanning" },
  { id: "trivy", job: "security", name: "Trivy", detail: "fs · CRITICAL,HIGH" },
  { id: "t-setup", job: "test", name: "Checkout + Node 22", detail: "setup-node@v4, cache npm" },
  { id: "lint", job: "test", name: "npm ci + ESLint", detail: "npm run lint" },
  { id: "migrate", job: "test", name: "Migrasi DB", detail: "PostgreSQL 16 service" },
  { id: "coverage", job: "test", name: "Tes + coverage", detail: "npm run test:coverage" },
  { id: "buildx", job: "release", name: "Buildx + login GHCR", detail: "GITHUB_TOKEN" },
  { id: "meta", job: "release", name: "Metadata tag", detail: "semver, sha, latest" },
  { id: "push", job: "release", name: "Build & push", detail: "Dockerfile multi-stage" },
];

const scenarios: { id: ScenarioId; label: string; trigger: string }[] = [
  { id: "pr", label: "Pull request normal", trigger: "pull_request → master" },
  { id: "secret", label: "Secret ikut ter-commit", trigger: "pull_request → master" },
  { id: "vuln", label: "Dependensi rentan", trigger: "pull_request → master" },
  { id: "test", label: "Tes gagal", trigger: "pull_request → master" },
  { id: "tag", label: "Push tag v1.0.0", trigger: "push tag v*.*.*" },
];

function outcome(s: ScenarioId, step: string): Done {
  if (s === "secret" && step === "gitleaks") return "fail";
  if (s === "vuln" && step === "trivy") return "warn";
  if (s === "test" && step === "coverage") return "fail";
  return "ok";
}

function logFor(s: ScenarioId, step: string): [string, Tone][] {
  const o = outcome(s, step);
  switch (step) {
    case "s-checkout":
      return [["Checkout repository", "plain"]];
    case "gitleaks":
      return o === "fail"
        ? [
            ["gitleaks scan: 1 commit", "plain"],
            ["Finding: generic-api-key  File: src/config.js  (contoh)", "fail"],
            ["leaks found: 1, exit code 1", "fail"],
          ]
        : [
            ["gitleaks scan: commit pada PR", "plain"],
            ["no leaks found", "ok"],
          ];
    case "trivy":
      return o === "warn"
        ? [
            ["trivy fs . --severity CRITICAL,HIGH", "plain"],
            ["package-lock.json  HIGH: 1  (contoh)", "warn"],
            ["exit-code: 0, temuan dilaporkan tapi step tetap lulus", "warn"],
          ]
        : [
            ["trivy fs . --severity CRITICAL,HIGH", "plain"],
            ["Total: 0 (CRITICAL: 0, HIGH: 0)", "ok"],
          ];
    case "t-setup":
      return [
        ["service postgres:16-alpine sehat (pg_isready)", "info"],
        ["node-version: 22, cache: npm", "plain"],
      ];
    case "lint":
      return [
        ["npm ci", "plain"],
        ["npm run lint: 0 problems", "ok"],
      ];
    case "migrate":
      return [
        ["buat .test.env", "plain"],
        ["npm run migrate:test up: migrasi selesai", "ok"],
      ];
    case "coverage":
      return o === "fail"
        ? [
            ["npm run test:coverage", "plain"],
            ["FAIL  AddThreadUseCase.test.js  (contoh)", "fail"],
            ["AssertionError: expected 404 to equal 201", "fail"],
          ]
        : [
            ["npm run test:coverage", "plain"],
            ["Statements 100% | Branches 100% | Functions 100% | Lines 100%", "ok"],
          ];
    case "buildx":
      return [
        ["docker/setup-buildx-action@v3", "plain"],
        ["login ghcr.io sebagai github.actor", "ok"],
      ];
    case "meta":
      return [["tags: 1.0.0, 1.0, sha-ba3aa73, latest", "info"]];
    case "push":
      return [
        ["docker/build-push-action@v6", "plain"],
        ["pushed ghcr.io/arighmt67-bit/forum-api:1.0.0", "ok"],
      ];
  }
  return [];
}

const idle = () => Object.fromEntries(steps.map((s) => [s.id, "idle" as Status]));
const sleep = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

const statusText: Record<Status, string> = {
  idle: "menunggu",
  run: "berjalan",
  ok: "lulus",
  fail: "gagal",
  warn: "lulus dengan peringatan",
  skip: "dilewati",
};

const statusMark: Record<Status, string> = { idle: "", run: "", ok: "✓", fail: "✕", warn: "!", skip: "–" };

export default function PipelineLab() {
  const [scenario, setScenario] = useState<ScenarioId>("pr");
  const [status, setStatus] = useState<Record<string, Status>>(idle);
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ tone: Done; text: string } | null>(null);
  const runId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => () => {
    runId.current += 1;
  }, []);

  function reset() {
    runId.current += 1;
    setRunning(false);
    setStatus(idle());
    setLines([]);
    setResult(null);
  }

  async function runJob(job: Job, s: ScenarioId, id: number) {
    let failed = false;
    let warned = false;
    for (const step of steps.filter((x) => x.job === job)) {
      if (runId.current !== id) return null;
      if (failed) {
        setStatus((st) => ({ ...st, [step.id]: "skip" }));
        setLines((l) => [...l, { job, text: `↷ ${step.name} dilewati karena step sebelumnya gagal`, tone: "dim" }]);
        continue;
      }
      setStatus((st) => ({ ...st, [step.id]: "run" }));
      setLines((l) => [...l, { job, text: `▶ ${step.name}`, tone: "info" }]);
      for (const [text, tone] of logFor(s, step.id)) {
        await sleep(260);
        if (runId.current !== id) return null;
        setLines((l) => [...l, { job, text: `  ${text}`, tone }]);
      }
      await sleep(180);
      if (runId.current !== id) return null;
      const o = outcome(s, step.id);
      setStatus((st) => ({ ...st, [step.id]: o }));
      if (o === "fail") failed = true;
      if (o === "warn") warned = true;
    }
    return failed ? "fail" : warned ? "warn" : "ok";
  }

  async function run() {
    reset();
    const id = runId.current;
    const s = scenario;
    setRunning(true);
    const sc = scenarios.find((x) => x.id === s)!;
    setLines([{ job: "security", text: `$ trigger: ${sc.trigger}`, tone: "dim" }]);

    if (s === "tag") {
      const ciSteps = steps.filter((x) => x.job !== "release").map((x) => [x.id, "skip"]);
      setStatus((st) => ({ ...st, ...Object.fromEntries(ciSteps) }));
      setLines((l) => [...l, { job: "test", text: "ci.yml tidak dipicu oleh tag, hanya release.yml", tone: "dim" }]);
      const r = await runJob("release", s, id);
      if (r === null || runId.current !== id) return;
      setResult({ tone: "ok", text: "Image terbit di GHCR dengan tag 1.0.0, 1.0, sha-ba3aa73, dan latest." });
      setRunning(false);
      return;
    }

    const rel = steps.filter((x) => x.job === "release").map((x) => [x.id, "skip"]);
    setStatus((st) => ({ ...st, ...Object.fromEntries(rel) }));
    const [a, b] = await Promise.all([runJob("security", s, id), runJob("test", s, id)]);
    if (a === null || b === null || runId.current !== id) return;
    setLines((l) => [...l, { job: "release", text: "release.yml dilewati: hanya berjalan saat push tag v*.*.*", tone: "dim" }]);
    const text: Record<ScenarioId, string> = {
      pr: "Semua job lulus. PR siap di-review.",
      secret: "Job security-scan gagal di Gitleaks, jadi PR ditandai merah. Job test tetap jalan karena kedua job paralel.",
      vuln: "Workflow tetap hijau. Trivy hanya melaporkan temuan karena exit-code 0, jadi temuan harus dibaca manual.",
      test: "Job test gagal, jadi PR ditandai merah. Pemeriksaan keamanan tetap selesai.",
      tag: "",
    };
    setResult({ tone: a === "fail" || b === "fail" ? "fail" : a === "warn" ? "warn" : "ok", text: text[s] });
    setRunning(false);
  }

  return (
    <section id="simulator" aria-labelledby="simulator-title" className="border-y border-line bg-mist">
      <div className="container-x py-24 md:py-28">
        <p className="eyebrow">Simulator • (04)</p>
        <h2 id="simulator-title" className="section-title">
          Coba pipeline CI/CD Forum API.
        </h2>
        <p className="section-lead">
          Simulasi di browser berdasarkan ci.yml dan release.yml di repo forum-api. Tidak ada runner sungguhan
          yang dijalankan, dan temuan bertanda &quot;contoh&quot; hanya ilustrasi.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-[300px_1fr]">
          <div className="card flex flex-col gap-5 p-5">
            <fieldset>
              <legend className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">Skenario</legend>
              <div className="mt-3 grid gap-2">
                {scenarios.map((s) => (
                  <label
                    key={s.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      scenario === s.id ? "border-[color:var(--accent)] bg-surface-2 text-ink" : "border-line text-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value={s.id}
                      checked={scenario === s.id}
                      disabled={running}
                      onChange={() => setScenario(s.id)}
                      className="accent-[color:var(--accent)]"
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex gap-2">
              <button type="button" onClick={run} disabled={running} className="btn btn-primary btn-sm flex-1">
                {running ? "Berjalan…" : "Jalankan"}
              </button>
              <button type="button" onClick={reset} className="btn btn-ghost btn-sm">
                Reset
              </button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
              <a href={`${REPO}/ci.yml`} target="_blank" rel="noopener noreferrer" className="text-link">
                ci.yml ↗
              </a>
              <a href={`${REPO}/release.yml`} target="_blank" rel="noopener noreferrer" className="text-link">
                release.yml ↗
              </a>
            </div>
          </div>
          <div className="grid min-w-0 gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              {jobs.map((j) => (
                <div key={j.id} className="card p-4">
                  <p className="font-mono text-xs text-subtle">{j.file}</p>
                  <p className="mt-1 font-semibold">{j.name}</p>
                  <ol className="mt-4 space-y-3">
                    {steps
                      .filter((s) => s.job === j.id)
                      .map((s) => {
                        const st = status[s.id];
                        return (
                          <li key={s.id} className="flex items-start gap-3">
                            <span className={`st st-${st}`} aria-hidden="true">
                              {statusMark[st]}
                            </span>
                            <span className="min-w-0">
                              <span className={`block text-sm ${st === "skip" ? "text-subtle line-through" : ""}`}>
                                {s.name}
                              </span>
                              <span className="block font-mono text-[11px] text-subtle">{s.detail}</span>
                              <span className="sr-only">, {statusText[st]}</span>
                            </span>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              ))}
            </div>
            <div className="terminal overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[#2c2c2e] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-[#8e8e93]">runner log</span>
              </div>
              <div
                ref={logRef}
                className="h-64 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed"
                tabIndex={0}
                aria-label="Log runner simulasi"
              >
                {lines.length === 0 && <p className="tone-dim">Pilih skenario lalu tekan Jalankan.</p>}
                {lines.map((l, k) => (
                  <p key={k} className={`whitespace-pre-wrap tone-${l.tone}`}>
                    <span className="tone-dim">[{jobs.find((j) => j.id === l.job)!.name}] </span>
                    {l.text}
                  </p>
                ))}
              </div>
            </div>
            <p
              aria-live="polite"
              className={`min-h-6 text-sm font-medium ${
                result?.tone === "fail"
                  ? "text-[color:var(--fail)]"
                  : result?.tone === "warn"
                    ? "text-[color:var(--warn)]"
                    : "text-[color:var(--ok)]"
              }`}
            >
              {result ? `${result.tone === "fail" ? "✕" : result.tone === "warn" ? "!" : "✓"} ${result.text}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
