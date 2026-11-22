export const site = {
  name: "Ari Rahmat Romadhon",
  location: "Tangerang, Indonesia",
  email: "arirahmatromadhon@gmail.com",
  github: "https://github.com/arighmt67-bit",
  linkedin: "https://www.linkedin.com/in/ari-rahmat-romadhon/",
  dicoding: "https://www.dicoding.com/users/arijhmtr/academies",
  url: "https://arirahmatrportofolio.vercel.app",
  cv: "/cv-ari-rahmat-romadhon.pdf",
  title: "Ari Rahmat Romadhon | Cloud, DevOps & Security",
  description:
    "Portofolio Ari Rahmat Romadhon: proyek submission Dicoding di bidang DevOps, Cloud, Security, dan Backend, lengkap dengan cara kerja, bukti, dan batasannya.",
};

export const navLinks = [
  { id: "tentang", label: "Tentang" },
  { id: "keahlian", label: "Keahlian" },
  { id: "proyek", label: "Proyek" },
  { id: "simulator", label: "Simulator" },
  { id: "kelas", label: "Kelas" },
  { id: "kontak", label: "Kontak" },
];

export const repos = [
  {
    name: "devops-engineer",
    url: `${site.github}/devops-engineer`,
    note: "Jaringan, Linux, CI/CD, dan microservices",
  },
  {
    name: "back-end-engineering",
    url: `${site.github}/back-end-engineering`,
    note: "API JavaScript dan Python, Google Cloud, ML",
  },
  {
    name: "forum-api",
    url: `${site.github}/forum-api`,
    note: "Clean Architecture, CI/CD, image di GHCR",
  },
];

export const learningPaths = [
  {
    name: "DevOps",
    courses: [
      "Belajar Jaringan Komputer untuk Pemula",
      "Menjadi Linux System Administrator",
      "Belajar Implementasi CI/CD",
      "Belajar Membangun Arsitektur Microservices",
    ],
  },
  {
    name: "Google Cloud",
    courses: [
      "Menjadi Google Cloud Engineer",
      "Menjadi Google Cloud Architect",
      "Belajar Penerapan Machine Learning dengan Google Cloud",
    ],
  },
  {
    name: "Back-End JavaScript",
    courses: [
      "Belajar Back-End Pemula dengan JavaScript",
      "Belajar Fundamental Back-End dengan JavaScript",
      "Menjadi Back-End Developer Expert dengan JavaScript",
    ],
  },
  {
    name: "Python dan Data",
    courses: ["Belajar Fundamental Back-End dengan Python", "Belajar Fundamental Pemrosesan Data"],
  },
];

export const courseCount = learningPaths.reduce((n, p) => n + p.courses.length, 0);
