import { projects } from "@/data/projects";
import { learningPaths, site } from "@/data/site";
import { ProjectChip } from "./ClientButtons";

export default function Courses() {
  return (
    <section id="kelas" aria-labelledby="kelas-title" className="container-x py-24 md:py-28">
      <p className="eyebrow">Kelas • (05)</p>
      <h2 id="kelas-title" className="section-title">
        Kelas Dicoding asal proyek.
      </h2>
      <p className="section-lead">
        Setiap kelas dihubungkan ke proyek yang dikerjakan di dalamnya. Klik nama proyek untuk membuka detailnya.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {learningPaths.map((path) => (
          <article key={path.name} className="card p-6">
            <h3 className="font-display text-xl font-extrabold">{path.name}</h3>
            <ul className="mt-5 space-y-5">
              {path.courses.map((c) => {
                const list = projects.filter((p) => p.course === c || p.courses?.includes(c));
                return (
                  <li key={c} className="border-t border-line pt-4 first:border-0 first:pt-0">
                    <p className="font-medium">{c}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {list.map((p) => (
                        <ProjectChip key={p.id} id={p.id} label={p.title} />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
      <a href={site.dicoding} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
        Profil Dicoding ↗
      </a>
    </section>
  );
}
