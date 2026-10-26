import type { MetadataRoute } from "next";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...site.nav.map((item) => item.href), "/areas"];
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: s.slug === "sump-cleaning" || s.slug === "tank-cleaning" ? 0.9 : 0.7,
    })),
    ...areas.map((a) => ({
      url: absoluteUrl(`/areas/${a.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
