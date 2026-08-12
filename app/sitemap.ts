import type { MetadataRoute } from "next";
import { diaryEntries } from "@/lib/entries";
import { siteMetadata } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/entries", "/work", "/about"];
  const entryRoutes = diaryEntries.map((entry) => `/entries/${entry.slug}`);

  return [...staticRoutes, ...entryRoutes].map((route) => ({
    url: `${siteMetadata.url}${route}`,
    lastModified: new Date(),
  }));
}
