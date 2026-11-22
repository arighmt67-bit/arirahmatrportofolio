import { site } from "@/data/site";
import { CopyButton } from "./ClientButtons";

const curl = `curl -s ${site.url}/resume.json`;

export default function Contact() {
  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: "in/ari-rahmat-romadhon", href: site.linkedin },
    { label: "GitHub", value: "arighmt67-bit", href: site.github },
    { label: "Dicoding", value: "arijhmtr", href: site.dicoding },
    { label: "CV", value: "PDF, 3 halaman", href: site.cv },
  ];
  return (
    <section id="kontak" aria-labelledby="kontak-title" className="border-t border-line bg-mist">
      <div className="container-x py-24 md:py-28">
        <p className="eyebrow">Kontak • (06)</p>
        <h2 id="kontak-title" className="section-title">
          Mari ngobrol soal peluang kerja.
        </h2>
        <p className="section-lead">
          Terbuka untuk peran junior di bidang Cloud, DevOps, atau Security, baik full-time maupun kontrak.
        </p>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <ul className="card min-w-0 divide-y divide-[color:var(--line)] px-6">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group flex min-w-0 items-center justify-between gap-4 py-4"
                >
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-subtle">{l.label}</span>
                  <span className="min-w-0 truncate text-ink group-hover:text-accent">{l.value} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="card flex min-w-0 flex-col p-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">Profil sebagai JSON</p>
            <p className="mt-3 text-muted">
              Data di halaman ini juga tersedia dalam format JSON, jadi bisa dibaca dari terminal.
            </p>
            <div className="terminal mt-5 flex items-center justify-between gap-3 px-4 py-3">
              <code className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-[13px]">
                <span className="tone-ok">$</span> {curl}
              </code>
              <CopyButton text={curl} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                Kirim email
              </a>
              <CopyButton text={site.email} label="Salin email" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
