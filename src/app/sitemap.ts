import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: "2026-11-22", changeFrequency: "monthly", priority: 1 }];
}
