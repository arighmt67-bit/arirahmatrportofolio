import Image from "next/image";
import { courseCount, site } from "@/data/site";
import { pillarOrder, projects } from "@/data/projects";
import Typewriter from "./Typewriter";

const focus = [
  "Pipeline CI/CD dengan Jenkins dan GitHub Actions",
  "Docker, Kubernetes, dan RabbitMQ",
  "Google Cloud: GKE, Cloud Run, App Engine",
  "Hardening SSH, TLS, dan rate limit",
  "REST API, PostgreSQL, dan Redis",
];

export default function Hero() {
  const stats = [
    { value: projects.length, label: "proyek" },
    { value: courseCount, label: "kelas Dicoding" },
    { value: pillarOrder.length, label: "bidang" },
  ];

  return (
    <section id="beranda" aria-labelledby="hero-title" className="container-x pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow">Cloud · DevOps · Security · Backend</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            Ari Rahmat
            <br />
            Romadhon<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 text-xl text-muted md:text-2xl">
            Belajar membangun dan mengamankan infrastruktur, dengan kode yang bisa dicek.
          </p>
          <p className="mt-4 min-h-[1.75rem] font-mono text-sm text-ink md:text-base">
            <span className="text-accent">&gt; </span>
            <Typewriter words={focus} />
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Kumpulan proyek submission Dicoding yang saya kerjakan. Setiap proyek menjelaskan cara kerja, bukti,
            dan batasannya, dengan kode yang bisa dicek langsung di GitHub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#proyek" className="btn btn-primary">
              Lihat proyek ↓
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn ↗
            </a>
            <a href={site.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Download CV ↓
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold md:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-sm text-subtle">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="card overflow-hidden p-2">
            <Image
              src="/ari.jpg"
              alt="Foto Ari Rahmat Romadhon"
              width={824}
              height={900}
              preload
              sizes="(min-width: 1024px) 384px, 90vw"
              className="h-auto w-full rounded-[18px] object-cover"
            />
            <div className="flex items-center gap-3 px-3 py-4">
              <span className="status-dot" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Terbuka untuk peran junior Cloud dan DevOps</p>
                <p className="mt-0.5 font-mono text-xs text-subtle">{site.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
