import type { Metadata } from "next";
import { site, siteUrl } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL. */
  path: string;
  keywords?: string[];
}

/**
 * One metadata builder for every route so titles, canonicals and social cards
 * cannot drift apart. Root defaults live in app/layout.tsx.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      "full-stack developer Zambia",
      "web developer Ndola",
      "health care software",
      "Next.js developer",
      "Spring Boot developer",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} — ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}

/** JSON-LD for the person behind the site, injected once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: "ZM",
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Spring Boot",
      "Health information systems",
    ],
  } as const;
}
