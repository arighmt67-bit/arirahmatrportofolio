export type Pillar = "devops" | "cloud" | "security" | "backend";

export interface Project {
  id: string;
  title: string;
  pillars: Pillar[];
  course: string;
  courses?: string[];
  summary: string;
  how: string[];
  flow?: string[];
  proof: string[];
  limits: string;
  tech: string[];
  repo: { label: string; url: string };
  snippet?: string;
}

const GH = "https://github.com/arighmt67-bit";
const DEVOPS = `${GH}/devops-engineer/tree/main`;
const BE = `${GH}/back-end-engineering/tree/main`;

export const pillarOrder: Pillar[] = ["devops", "cloud", "security", "backend"];

export const pillarMeta: Record<Pillar, { label: string; blurb: string }> = {
  devops: {
    label: "DevOps",
    blurb: "Pipeline CI/CD, container, Kubernetes, dan server Linux.",
  },
  cloud: {
    label: "Cloud",
    blurb: "Google Cloud: VM, serverless, GKE, database, dan IAM.",
  },
  security: {
    label: "Security",
    blurb: "Hardening, TLS, rate limit, secret scan, least privilege.",
  },
  backend: {
    label: "Backend",
    blurb: "REST API, database, cache, antrean, dan pengujian.",
  },
};

export const projects: Project[] = [
  {
    id: "jenkins-cicd",
    title: "Pipeline CI/CD dengan Jenkins",
    pillars: ["devops"],
    course: "Belajar Implementasi CI/CD",
    summary:
      "Scripted Pipeline Jenkins yang membangun aplikasi React di container Node, menjalankan tes Jest, menunggu persetujuan manual, lalu men-deploy.",
    how: [
      "Stage Build: install dependency di container node:lts-buster-slim lewat docker.image().inside().",
      "Stage Test: jenkins/scripts/test.sh menjalankan Jest dengan CI=true.",
      "Stage Manual Approval: pipeline berhenti di input() sampai disetujui.",
      "Stage Deploy: deliver.sh menjalankan aplikasi, pipeline menunggu 60 detik (syarat kelas), kill.sh menghentikannya, lalu log.txt diarsipkan sebagai artifact.",
    ],
    flow: ["Checkout", "Build", "Test (Jest)", "Manual Approval", "Deploy + 60 dtk", "Arsip log.txt"],
    proof: [
      "Jenkinsfile 4 stage ada di repo, beserta skrip test, deliver, dan kill.",
      "Log eksekusi dan screenshot verifikasi tersimpan di folder submission-artifacts.",
    ],
    limits: "Berjalan sebagai lab lokal, bukan layanan yang aktif.",
    tech: ["Jenkins", "Docker", "Node.js", "Jest", "Groovy"],
    repo: { label: "03-cicd-pipeline", url: `${DEVOPS}/03-cicd-pipeline` },
    snippet: "jenkins-cicd",
  },
  {
    id: "microservices",
    title: "Microservices: Compose, Kubernetes, dan RabbitMQ",
    pillars: ["devops"],
    course: "Belajar Membangun Arsitektur Microservices",
    summary:
      "Tiga submission berurutan: Item App dengan Docker Compose, Karsa Jobs (Go, Vue, MongoDB) di Kubernetes, dan e-commerce asinkron dengan RabbitMQ.",
    how: [
      "Item App: Dockerfile dan docker-compose.yml (aplikasi dan MongoDB, volume app-db, restart always). Image dipush ke GHCR lewat build_push_image.sh.",
      "Karsa Jobs: 11 manifest Kubernetes (Secret, ConfigMap, PVC, Deployment, Service) untuk MongoDB, backend Go, dan frontend Vue.",
      "E-commerce: order-service menerbitkan event ke RabbitMQ, shipping-service mengonsumsinya. Keduanya punya manifest Deployment dan Service.",
    ],
    flow: ["order-service (POST /order)", "RabbitMQ", "shipping-service (consumer)"],
    proof: [
      "README submission mencatat image di GHCR: item-app:v1, karsajobs, order-service, shipping-service.",
      "CI repo menjalankan kubeconform pada manifest Kubernetes.",
    ],
    limits: "Tidak ada cluster yang sedang berjalan.",
    tech: ["Docker Compose", "Kubernetes", "RabbitMQ", "Go", "Node.js", "MongoDB", "GHCR"],
    repo: { label: "04-microservices", url: `${DEVOPS}/04-microservices` },
    snippet: "microservices",
  },
  {
    id: "linux-sysadmin",
    title: "Linux SysAdmin: skrip monitoring dan hardening SSH",
    pillars: ["devops", "security"],
    course: "Menjadi Linux System Administrator",
    summary:
      "Dua submission: skrip Bash pemantau RAM dan disk, lalu konfigurasi server SSH yang hanya menerima public key.",
    how: [
      "script.sh: free -m dan df -BG, difilter awk tanpa tmpfs, diulang 3 kali dengan while dan sleep.",
      "sshd_config: PubkeyAuthentication yes, PasswordAuthentication no, PermitRootLogin no, port diganti ke 2000.",
      "User baru, pasangan kunci ed25519, lalu login ulang memakai key. Log SSH diekspor dari journalctl ke teks dan JSON.",
      "hapus-log.sh membersihkan journal sampai 10 MB. Daftar user dienkripsi dengan GPG.",
    ],
    proof: ["sshd_config, log-ssh.json, dan daftar-user.txt.gpg ada di repo."],
    limits: "Dikerjakan di mesin lab sendiri, bukan server produksi.",
    tech: ["Bash", "OpenSSH", "journalctl", "GPG", "awk"],
    repo: { label: "02-linux-system-admin", url: `${DEVOPS}/02-linux-system-admin` },
    snippet: "linux-sysadmin",
  },
  {
    id: "web-server",
    title: "Reverse proxy NGINX dan Apache dengan rate limit",
    pillars: ["devops", "security"],
    course: "Belajar Jaringan Komputer untuk Pemula",
    summary:
      "Server Node.js (Express) di belakang NGINX sebagai reverse proxy dengan batas 6 request per menit, plus versi Apache2.",
    how: [
      "NGINX mendengarkan port 80 dan 3000, lalu meneruskan ke Node.js di port 8000.",
      "limit_req_zone rate=6r/m, setara 1 request per 10 detik per IP.",
      "Apache2 di port 8080 sebagai proxy alternatif.",
      "Endpoint / dan /me menjawab sesuai kriteria kelas.",
    ],
    flow: ["Client", "NGINX :80 / :3000 (6 req/menit)", "Node.js :8000"],
    proof: ["Konfigurasi NGINX dan Apache2 serta daftar port tersimpan di repo."],
    limits:
      "Sempat di-deploy ke Railway, tetapi URL itu mengembalikan 404 saat dicek 22 Nov 2026, jadi tidak ditautkan.",
    tech: ["NGINX", "Apache2", "Node.js", "Express", "Linux"],
    repo: { label: "01-computer-networking", url: `${DEVOPS}/01-computer-networking` },
    snippet: "web-server",
  },
  {
    id: "gce-profile",
    title: "Web profile di Compute Engine dan Cloud Storage",
    pillars: ["cloud"],
    course: "Menjadi Google Cloud Engineer",
    summary:
      "VM e2-micro Ubuntu 22.04 yang memasang NGINX otomatis lewat startup script, dengan gambar disajikan dari bucket Cloud Storage.",
    how: [
      "VM profile-vm (e2-micro, asia-southeast2-a) dibuat dengan startup-script.sh di metadata, jadi NGINX terpasang tanpa SSH manual.",
      "Halaman HTML dan CSS murni, sesuai kriteria tanpa JavaScript sisi klien.",
      "Gambar profil disajikan dari bucket Cloud Storage di asia-southeast2.",
    ],
    flow: ["startup-script (metadata)", "VM e2-micro + NGINX", "Bucket GCS (gambar)"],
    proof: ["README mencatat GET / dan style.css = 200, serta gambar di bucket = 200 saat diverifikasi."],
    limits: "IP lama (34.50.103.97) tidak lagi merespons saat dicek 22 Nov 2026.",
    tech: ["Compute Engine", "Cloud Storage", "NGINX", "Bash"],
    repo: { label: "a-cloud-engineer-profile-app", url: `${BE}/02-backend-python-gcp/a-cloud-engineer-profile-app` },
  },
  {
    id: "money-tracker",
    title: "Money Tracker: App Engine, Cloud SQL, dan Cloud Storage",
    pillars: ["cloud"],
    course: "Menjadi Google Cloud Engineer",
    summary:
      "Aplikasi dengan frontend dan backend terpisah di App Engine, database Cloud SQL MySQL, dan unggahan berkas ke Cloud Storage.",
    how: [
      "Frontend dan backend di App Engine Standard. Cloud SQL (db-f1-micro) dan bucket berada di region yang sama, asia-southeast2.",
      "Bucket punya lifecycle rule: objek berumur lebih dari 30 hari dihapus otomatis.",
      "Akses reviewer lewat role per layanan, bukan editor atau owner.",
    ],
    flow: ["App Engine (frontend)", "App Engine (backend)", "Cloud SQL + Cloud Storage"],
    proof: ["README memuat project.json (nama project, URL, bucket) dan daftar role IAM yang diberikan."],
    limits: "Tidak ada URL live yang ditautkan di portofolio ini.",
    tech: ["App Engine", "Cloud SQL (MySQL)", "Cloud Storage", "IAM"],
    repo: { label: "c-cloud-engineer-money-tracker", url: `${BE}/02-backend-python-gcp/c-cloud-engineer-money-tracker` },
  },
  {
    id: "notes-gke",
    title: "Notes API di Google Kubernetes Engine",
    pillars: ["cloud", "devops"],
    course: "Menjadi Google Cloud Architect",
    summary:
      "API catatan dikemas jadi image, disimpan di Artifact Registry, dan dijalankan di cluster GKE satu node dengan Service LoadBalancer.",
    how: [
      "Image notes-api:v1 (linux/amd64) di Artifact Registry, repository notes-api-repo.",
      "Cluster GKE Standard, 1 node e2-micro di asia-southeast2-a, Deployment 1 replica.",
      "Service LoadBalancer memetakan port 80 ke port container 5000 (port berbeda, sesuai kriteria).",
      "Auditor Dicoding hanya mendapat artifactregistry.reader, container.viewer, dan browser.",
    ],
    flow: ["Docker image", "Artifact Registry", "GKE (1 node)", "LoadBalancer :80 → :5000"],
    proof: ["Manifest k8s/deployment.yaml dan service.yaml ada di repo."],
    limits: "Tidak ada cluster yang dijaga tetap aktif.",
    tech: ["GKE", "Artifact Registry", "Docker", "Kubernetes", "Node.js"],
    repo: { label: "e-cloud-architect-notes-api-k8s", url: `${BE}/02-backend-python-gcp/e-cloud-architect-notes-api-k8s` },
    snippet: "notes-gke",
  },
  {
    id: "asclepius",
    title: "Asclepius: inferensi model ML di Cloud Run",
    pillars: ["cloud", "backend"],
    course: "Belajar Penerapan Machine Learning dengan Google Cloud",
    summary:
      "Backend Hapi.js menjalankan model MobileNetV3 (TensorFlow.js) untuk klasifikasi cancer atau non-cancer, dengan riwayat prediksi di Firestore.",
    how: [
      "Backend di Cloud Run (skala ke nol saat idle). Model dimuat dari Cloud Storage.",
      "POST /predict menolak gambar lebih dari 1 MB dengan 413. GET /predict/histories membaca koleksi predictions di Firestore.",
      "Frontend di App Engine Standard (Node.js 22).",
      "Kriteria Compute Engine dan IP statis gugur karena memakai Cloud Run, sesuai panduan kelas.",
    ],
    flow: ["Pengguna", "App Engine (UI)", "Cloud Run (Hapi + TF.js)", "Cloud Storage (model) + Firestore (riwayat)"],
    proof: ["Koleksi Postman resmi kelas dijalankan terhadap endpoint Cloud Run. Hasil 413 dan 200 tercatat di README."],
    limits:
      "Dikerjakan dengan target semua saran; nilai akhir dari Dicoding tidak dicantumkan. Bukan alat diagnosis medis.",
    tech: ["Cloud Run", "App Engine", "Firestore", "Cloud Storage", "TensorFlow.js", "Hapi.js"],
    repo: { label: "asclepius", url: `${BE}/03-machine-learning-gcp/asclepius` },
  },
  {
    id: "forum-api-secure",
    title: "Forum API: CI/CD dengan pemeriksaan secret dan dependensi",
    pillars: ["security", "devops"],
    course: "Menjadi Back-End Developer Expert dengan JavaScript",
    summary:
      "GitHub Actions memeriksa secret dan dependensi, menjalankan lint dan tes dengan PostgreSQL, lalu merilis image Docker ke GHCR lewat tag versi.",
    how: [
      "ci.yml (pull request ke master): Gitleaks untuk secret, Trivy untuk dependensi (CRITICAL dan HIGH), ESLint, migrasi, lalu tes dengan coverage di service container PostgreSQL 16.",
      "release.yml (tag v*): build Dockerfile multi-stage, push ke ghcr.io dengan tag semver, major.minor, dan sha.",
      "NGINX di depan aplikasi: TLS Let's Encrypt dan rate limit 90 request per menit pada /threads (status 429).",
      "deploy/gcp-lab.sh membuat dan menghapus server uji e2-micro di Google Cloud sesuai kebutuhan.",
    ],
    flow: ["Pull request", "Gitleaks", "Trivy", "ESLint + migrasi", "Tes + coverage", "Tag v* → build", "GHCR"],
    proof: [
      "Rilis v1.0.0 dan image publik di GHCR.",
      "Laporan coverage lokal: 100% statements, branches, functions, dan lines.",
      "Workflow CI dan Release aktif di GitHub Actions.",
    ],
    limits:
      "Trivy diset exit-code 0: temuan dilaporkan tetapi tidak menggagalkan build. Workflow CD (deploy lewat SSH) sengaja dinonaktifkan, dan tidak ada server yang berjalan terus-menerus.",
    tech: ["GitHub Actions", "Gitleaks", "Trivy", "Docker", "GHCR", "NGINX", "Let's Encrypt", "PostgreSQL"],
    repo: { label: "forum-api", url: `${GH}/forum-api` },
    snippet: "forum-api",
  },
  {
    id: "gcp-iam",
    title: "Akses auditor GCP tanpa role editor atau owner",
    pillars: ["security", "cloud"],
    course: "Tiga kelas Google Cloud",
    courses: ["Menjadi Google Cloud Engineer", "Menjadi Google Cloud Architect", "Belajar Penerapan Machine Learning dengan Google Cloud"],
    summary:
      "Tiga submission GCP memberi grup reviewer Dicoding role per layanan, tidak pernah editor atau owner project.",
    how: [
      "Money Tracker: viewer, appengine.appViewer, cloudsql.viewer, browser, artifactregistry.reader, dan storage.admin.",
      "Notes API: artifactregistry.reader, container.viewer, dan browser.",
      "Asclepius: akses baca (viewer atau reader) ke App Engine, Storage, Cloud Run, Datastore, Artifact Registry, dan jaringan.",
    ],
    proof: ["Daftar role tertulis di README ketiga submission."],
    limits: "Bukti berupa daftar role di README, tanpa audit IAM otomatis. Pada Money Tracker, reviewer juga mendapat storage.admin, yang lebih luas dari role baca.",
    tech: ["IAM", "GCP", "Least privilege"],
    repo: { label: "c-cloud-engineer-money-tracker", url: `${BE}/02-backend-python-gcp/c-cloud-engineer-money-tracker` },
  },
  {
    id: "forum-api-arch",
    title: "Forum API: Clean Architecture dan TDD",
    pillars: ["backend"],
    course: "Menjadi Back-End Developer Expert dengan JavaScript",
    summary:
      "REST API forum (thread, komentar, balasan, like) dengan empat lapis Clean Architecture dan coverage 100%.",
    how: [
      "Lapisan Domains, Applications, Infrastructures, dan Interfaces. Arah dependensi selalu ke dalam.",
      "JWT access token dan refresh token, hash bcrypt, PostgreSQL dengan migrasi node-pg-migrate.",
      "Tes unit, integrasi, dan fungsional dengan Vitest.",
    ],
    flow: ["Client", "NGINX (TLS, rate limit)", "Express (Interfaces)", "Use case", "PostgreSQL"],
    proof: ["Coverage 100% pada laporan lokal.", "Tes berjalan di CI dengan service container PostgreSQL."],
    limits:
      "Catatan penulis di README: makin banyak lapisan berarti makin banyak kode yang dijaga, manfaatnya terasa saat aturan bisnis bertambah.",
    tech: ["Node.js 22", "Express", "PostgreSQL", "JWT", "bcrypt", "Vitest"],
    repo: { label: "forum-api", url: `${GH}/forum-api` },
  },
  {
    id: "openjob",
    title: "OpenJob API V2: cache, antrean, dan unggah berkas",
    pillars: ["backend"],
    course: "Belajar Fundamental Back-End dengan JavaScript",
    summary:
      "REST API lowongan kerja dengan Redis cache, upload PDF, dan pengiriman email lewat consumer RabbitMQ.",
    how: [
      "Cache Redis selama 1 jam. Header X-Data-Source menandai cache atau database, dan cache dibatalkan saat data berubah.",
      "Saat kandidat melamar, API mengirim pesan ke RabbitMQ. Consumer terpisah mengirim email.",
      "Berkas PDF disimpan di uploads/, metadata di tabel documents. Validasi Joi, migrasi node-pg-migrate.",
    ],
    flow: ["Request", "Express API", "PostgreSQL + Redis cache", "RabbitMQ", "Consumer → email"],
    proof: ["README mendokumentasikan endpoint ber-cache, struktur folder, dan consumer."],
    limits: "Butuh PostgreSQL, Redis, dan RabbitMQ berjalan. Tidak ada instance live.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "RabbitMQ", "Joi", "Multer"],
    repo: { label: "c-fundamental-openjob-api", url: `${BE}/01-backend-javascript/c-fundamental-openjob-api` },
  },
  {
    id: "dicoevent",
    title: "DicoEvent: Django REST dengan Redis, Celery, dan MinIO",
    pillars: ["backend"],
    course: "Belajar Fundamental Back-End dengan Python",
    summary:
      "API manajemen event dalam dua versi: versi 1 untuk model, JWT, dan RBAC; versi 2 menambah cache, tugas asinkron, penyimpanan berkas, dan log.",
    how: [
      "Versi 1: Django 4.2, DRF, PostgreSQL. Model Event, Ticket, Order, JWT login dan refresh, RBAC admin dan user.",
      "Versi 2: cache Redis TTL 1 jam dengan header X-Data-Source dan invalidasi saat data berubah.",
      "Celery mengirim email pengingat H-2 jam. MinIO menyimpan poster (maks. 500 kB, validasi MIME). Loguru memisahkan application.log dan error.log dengan rotasi harian.",
    ],
    proof: ["README mencatat kriteria versi 1 dan versi 2 beserta implementasinya."],
    limits: "Butuh PostgreSQL, Redis, dan MinIO berjalan. Tidak ada instance live.",
    tech: ["Django REST Framework", "PostgreSQL", "Redis", "Celery", "MinIO", "Loguru", "JWT"],
    repo: { label: "d-fundamental-python-dicoevent", url: `${BE}/02-backend-python-gcp/d-fundamental-python-dicoevent` },
  },
  {
    id: "etl",
    title: "Pipeline ETL dengan pengujian per tahap",
    pillars: ["backend"],
    course: "Belajar Fundamental Pemrosesan Data",
    summary:
      "Scraper 50 halaman yang ditransformasi lalu dimuat ke CSV, PostgreSQL, atau Google Sheets, dengan pytest untuk tiap tahap.",
    how: [
      "main.py: scrape_main(total_pages=50), transform_data, lalu load_to_csv, load_to_postgresql, atau load_to_google_sheets.",
      "Tes terpisah test_extract, test_transform, dan test_load dengan pytest-cov.",
      "README Python & GCP mencantumkan cron sebagai penjadwal.",
    ],
    flow: ["Extract (scrape)", "Transform", "Load: CSV · PostgreSQL · Google Sheets"],
    proof: ["Job Python ETL Test Suite di CI monorepo menjalankan pytest dengan coverage."],
    limits: "Kredensial Google Sheets tidak disertakan; hanya berkas contoh google-sheets-api.example.json.",
    tech: ["Python", "pandas", "SQLAlchemy", "PostgreSQL", "pytest", "Google Sheets API"],
    repo: { label: "f-fundamental-pemrosesan-data-etl", url: `${BE}/02-backend-python-gcp/f-fundamental-pemrosesan-data-etl` },
    snippet: "etl-pipeline",
  },
  {
    id: "bookshelf",
    title: "Bookshelf API di Cloud Run, diuji dengan Newman",
    pillars: ["backend", "cloud"],
    course: "Belajar Back-End Pemula dengan JavaScript",
    summary:
      "CRUD buku dengan Hapi, validasi input, filter query, dan container yang dijalankan di Cloud Run.",
    how: [
      "Hapi v21 di port 9000 (kriteria kelas) dan 8080 di container Cloud Run.",
      "Filter query seperti ?name= dan ESLint dengan konfigurasi dicodingacademy.",
      "Diverifikasi dengan koleksi Postman Dicoding lewat Newman.",
    ],
    proof: ["README mendokumentasikan endpoint, port, dan langkah verifikasi Newman."],
    limits: "URL Cloud Run di README mengembalikan 404 pada /books saat dicek 22 Nov 2026, jadi tidak ditautkan.",
    tech: ["Node.js", "Hapi", "Cloud Run", "Docker", "Newman"],
    repo: { label: "a-pemula-bookshelf-api", url: `${BE}/01-backend-javascript/a-pemula-bookshelf-api` },
  },
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
