import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Required for `output: "export"` — metadata routes must be prerendered.
export const dynamic = "force-static";

/** Static routes only — the blog has no published posts yet, so no detail URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/services/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog/`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
