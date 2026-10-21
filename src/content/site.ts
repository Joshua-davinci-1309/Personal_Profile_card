/**
 * Single source of truth for identity, contact detail and links.
 *
 * Everything marked TODO is a placeholder: swap it for the real value and the
 * whole site updates (header, footer, contact page, metadata, sitemap).
 */

export type SocialKey = "github" | "linkedin" | "x";

export interface SocialLink {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  description: string;
}

export const site = {
  name: "Joshua Mwelwa",
  firstName: "Joshua",
  initials: "JM",
  role: "Full-stack web developer",
  /** Short promise used in metadata and the footer. */
  tagline: "Health-care grade software, shipped on time.",
  /** The business line, kept verbatim from the brief. */
  slogan: "3 years of delivering trusted health care solutions and software country wide.",
  url: "https://joshuamwelwa.dev",
  locale: "en_ZM",

  location: {
    city: "Ndola",
    country: "Zambia",
    region: "Copperbelt",
    timezone: "CAT (UTC+2)",
  },

  /** TODO: replace with the address you actually read. */
  email: "hello@joshuamwelwa.dev",
  /** TODO: replace with your number, or delete the key to hide the phone row. */
  phone: "+260 97 000 0000",

  availability: {
    status: "Available for selected projects",
    responseTime: "Replies within one business day",
    workingHours: "Mon–Fri · 08:00–18:00 CAT",
  },

  socials: [
    {
      key: "github",
      label: "GitHub",
      handle: "@joshuamwelwa",
      // TODO: replace with your real profile URL.
      href: "https://github.com/joshuamwelwa",
      description: "Source code, experiments and open components.",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: "in/joshuamwelwa",
      // TODO: replace with your real profile URL.
      href: "https://www.linkedin.com/in/joshuamwelwa",
      description: "Work history, recommendations and client notes.",
    },
    {
      key: "x",
      label: "X / Twitter",
      handle: "@joshuamwelwa",
      // TODO: replace with your real profile URL.
      href: "https://x.com/joshuamwelwa",
      description: "Build logs, engineering notes and the occasional rant.",
    },
  ] satisfies SocialLink[],
} as const;

export const siteUrl = site.url.replace(/\/$/, "");
