import { ImageResponse } from "next/og";

export const alt = "Ari Rahmat Romadhon | Cloud, DevOps & Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pillars = [
  ["DevOps", "#2997ff"],
  ["Cloud", "#64d2ff"],
  ["Security", "#ff9f0a"],
  ["Backend", "#30d158"],
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#2997ff" }}>
          PORTOFOLIO · DICODING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            Ari Rahmat Romadhon
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "#b0b0b5" }}>
            15 proyek dari 12 kelas, lengkap dengan kode dan batasannya.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 36 }}>
            {pillars.map(([label, color]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 30 }}>
                <div style={{ width: 16, height: 16, borderRadius: 16, background: color }} />
                {label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#8e8e93" }}>arirahmatrportofolio.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
