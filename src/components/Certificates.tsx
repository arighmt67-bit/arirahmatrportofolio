import Image from "next/image";
import { certifications } from "@/data/site";

export default function Certificates() {
  return (
    <section id="sertifikat" aria-labelledby="sertifikat-title" className="border-t border-line">
      <div className="container-x py-24 md:py-28">
        <p className="eyebrow">Sertifikat • (06)</p>
        <h2 id="sertifikat-title" className="section-title">
          Sertifikat yang bisa diverifikasi.
        </h2>
        <p className="section-lead">Setiap sertifikat ditautkan ke halaman verifikasi di situs penerbitnya.</p>
        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.id} className="card flex flex-col gap-6 p-6 sm:flex-row">
              <Image
                src={c.image.src}
                alt={`Badge ${c.name}`}
                width={c.image.width}
                height={c.image.height}
                sizes="112px"
                className="h-28 w-28 shrink-0 object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{c.kind}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold">{c.name}</h3>
                <p className="mt-1 text-muted">{c.issuer}</p>
                <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <dt className="text-subtle">Terbit</dt>
                  <dd>
                    <time dateTime={c.issuedISO}>{c.issued}</time>
                  </dd>
                  <dt className="text-subtle">Mitra</dt>
                  <dd>{c.partner}</dd>
                </dl>
                <p className="mt-4 leading-relaxed text-muted">{c.criteria}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skill">
                  {c.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                <a href={c.verify} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-6">
                  Verifikasi di Credly ↗<span className="sr-only"> {c.name}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
