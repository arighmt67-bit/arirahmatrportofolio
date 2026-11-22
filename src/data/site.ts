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
  { id: "sertifikat", label: "Sertifikat" },
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

export const certifications = [
  {
    id: "aws-restart",
    name: "AWS re/Start Graduate",
    issuer: "Amazon Web Services Training and Certification",
    partner: "Orbit Future Academy",
    issued: "10 Juni 2026",
    issuedISO: "2026-06-10",
    kind: "Badge kelulusan program",
    criteria: "Menyelesaikan pelatihan IT Fundamentals, AWS Cloud, dan keterampilan profesional.",
    skills: ["AWS Cloud", "Amazon Web Services", "Cloud Platform", "Cloud Services"],
    image: { src: "/badges/aws-restart.png", width: 600, height: 600 },
    verify: "https://www.credly.com/badges/d1022466-a030-484b-92b0-51abc0194285/public_url",
  },
];

export const dicodingCertificates = [
  { id: "81P2OGJWNZOY", course: "Belajar Jaringan Komputer untuk Pemula", level: "Pemula", hours: 25, issued: "12 Februari 2026", issuedISO: "2026-02-12", valid: "12 Februari 2029", validISO: "2029-02-12", url: "https://www.dicoding.com/certificates/81P2OGJWNZOY" },
  { id: "KEXLM84ORZG2", course: "Menjadi Linux System Administrator", level: "Menengah", hours: 25, issued: "25 Agustus 2026", issuedISO: "2026-08-25", valid: "25 Agustus 2029", validISO: "2029-08-25", url: "https://www.dicoding.com/certificates/KEXLM84ORZG2" },
  { id: "EYX4O0R4JXDL", course: "Belajar Implementasi CI/CD", level: "Menengah", hours: 30, issued: "27 Agustus 2026", issuedISO: "2026-08-27", valid: "27 Agustus 2029", validISO: "2029-08-27", url: "https://www.dicoding.com/certificates/EYX4O0R4JXDL" },
  { id: "MRZMV8G0LZYQ", course: "Belajar Membangun Arsitektur Microservices", level: "Mahir", hours: 60, issued: "28 Agustus 2026", issuedISO: "2026-08-28", valid: "28 Agustus 2029", validISO: "2029-08-28", url: "https://www.dicoding.com/certificates/MRZMV8G0LZYQ" },
  { id: "JMZVLDMROXN9", course: "Menjadi Google Cloud Engineer", level: "Menengah", hours: 42, issued: "6 September 2026", issuedISO: "2026-09-06", valid: "6 September 2029", validISO: "2029-09-06", url: "https://www.dicoding.com/certificates/JMZVLDMROXN9" },
];

export const certificateCount = certifications.length + dicodingCertificates.length;

export const courseCount = learningPaths.reduce((n, p) => n + p.courses.length, 0);
