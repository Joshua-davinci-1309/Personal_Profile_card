export interface NavItem {
  label: string;
  href: string;
  /** Shown as a hint in the mobile drawer. */
  description: string;
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "The short version: who I am and what I ship.",
  },
  {
    label: "Services",
    href: "/services",
    description: "What I can take off your plate.",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Field notes on building software here.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Start a project or just say hello.",
  },
];

export const primaryCta = {
  label: "Start a project",
  href: "/contact",
} as const;
