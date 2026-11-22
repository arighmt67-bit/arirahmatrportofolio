import { projects } from "@/data/projects";
import { certifications, learningPaths, repos, site } from "@/data/site";

export function GET() {
  return Response.json(
    {
      name: site.name,
      location: site.location,
      focus: ["DevOps", "Cloud", "Security", "Backend"],
      cv: `${site.url}${site.cv}`,
      contact: { email: site.email, github: site.github, linkedin: site.linkedin, dicoding: site.dicoding },
      repositories: repos.map((r) => r.url),
      learning_paths: learningPaths,
      certifications: certifications.map((c) => ({
        name: c.name,
        issuer: c.issuer,
        issued: c.issuedISO,
        verify: c.verify,
      })),
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        pillars: p.pillars,
        course: p.courses ?? [p.course],
        tech: p.tech,
        limits: p.limits,
        repo: p.repo.url,
      })),
      checked: "2026-11-22",
    },
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
