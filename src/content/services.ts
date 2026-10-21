export type ServiceStatus = "coming-soon" | "available";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  status: ServiceStatus;
  /** Rendered as the "what you get" checklist. */
  includes: string[];
  idealFor: string;
}

/**
 * Services are intentionally marked `coming-soon`: the detail pages, pricing
 * and case studies are still being written. The cards stay useful in the
 * meantime because they describe exactly what is on offer.
 */
export const services: Service[] = [
  {
    slug: "health-care-systems",
    title: "Health-care systems",
    summary:
      "Patient records, appointments, billing and reporting for clinics, pharmacies and labs — built for shared terminals and unreliable networks.",
    status: "coming-soon",
    includes: [
      "Requirements workshop and process map",
      "Patient / client record module",
      "Appointments, queues and triage states",
      "Role-based permissions and audit trail",
      "Offline-tolerant forms with sync on reconnect",
    ],
    idealFor: "Clinics, pharmacies, diagnostic labs and NGOs running facility programmes.",
  },
  {
    slug: "business-platforms",
    title: "Business platforms",
    summary:
      "The internal system your team actually needs: inventory, orders, approvals and the dashboards that close the month on time.",
    status: "coming-soon",
    includes: [
      "Domain modelling and data design",
      "Inventory, sales or order workflows",
      "Operational dashboard with exports",
      "Approvals, notifications and audit history",
      "Admin tooling the operations team can drive",
    ],
    idealFor: "Retail, distribution, logistics and service businesses past spreadsheet scale.",
  },
  {
    slug: "api-integration",
    title: "API & integration engineering",
    summary:
      "Mobile money, SMS, payments and third-party systems connected with typed contracts, retries and logs that tell you what broke and when.",
    status: "coming-soon",
    includes: [
      "REST API design and documentation",
      "Payment and mobile-money integration",
      "SMS and notification pipelines",
      "Idempotency, retries and dead-letter handling",
      "Observability: structured logs and alerts",
    ],
    idealFor: "Products that need to talk to Zambian payment rails and telco services.",
  },
  {
    slug: "ui-engineering",
    title: "UI engineering & design systems",
    summary:
      "Component libraries and interfaces that hold together as the product grows — accessible, token-driven and fast on a mid-range Android phone.",
    status: "coming-soon",
    includes: [
      "Design token and theme setup",
      "Reusable component library",
      "Responsive and accessible states",
      "Performance budget and image strategy",
      "Storybook-style documentation",
    ],
    idealFor: "Teams with a designer and no engineer to turn the file into a system.",
  },
  {
    slug: "maintenance",
    title: "Maintenance & performance",
    summary:
      "Taking over a system that shipped once and stopped: dependency rescue, slow-page triage and a maintenance rhythm that prevents the next outage.",
    status: "coming-soon",
    includes: [
      "Audit of dependencies and build pipeline",
      "Performance profiling and fixes",
      "Test and CI baseline",
      "Backup and rollback plan",
      "Monthly maintenance retainer",
    ],
    idealFor: "Founders whose app works, but only just.",
  },
];

export const engagementSteps = [
  {
    step: "01",
    title: "Discovery call",
    body: "Thirty minutes on the problem, the people who will use the system and the constraint that matters most.",
  },
  {
    step: "02",
    title: "Scope & estimate",
    body: "A written scope, an increment plan and a date. If the scope is wrong, we fix the scope before code, not after.",
  },
  {
    step: "03",
    title: "Build in increments",
    body: "Working software every two weeks, reviewable on a real URL, with decisions written down as we go.",
  },
  {
    step: "04",
    title: "Handover & support",
    body: "Documentation, a walkthrough with your team and a support window so nothing is a black box.",
  },
] as const;
