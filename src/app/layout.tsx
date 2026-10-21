import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site, siteUrl } from "@/content/site";
import { personJsonLd } from "@/lib/seo";

/*
 * Fonts are self-hosted (see src/fonts/README.md) instead of pulled from Google Fonts at
 * build time: the build stays reproducible offline, the site makes zero third-party
 * requests, and there is no CLS from a late-loading webfont.
 */
const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const fraunces = localFont({
  src: "../fonts/fraunces-latin-full-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role} in ${site.location.city}, ${site.location.country}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Full-stack web developer in Ndola, Zambia. I build health-care systems, business platforms and the APIs behind them with Next.js, React, Node.js and Spring Boot — delivered on time, every time.",
  keywords: [
    "Joshua Mwelwa",
    "full-stack developer Zambia",
    "web developer Ndola",
    "health care software Zambia",
    "Next.js developer",
    "Spring Boot developer",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060701",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="grain min-h-dvh">
        <a
          href="#main"
          className="bg-rose text-canvas sr-only rounded-full px-5 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <SiteFooter />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
