/**
 * The four things I actually get hired for.
 * Written as problem → outcome so the value is legible in one read.
 */
export interface Capability {
  id: string;
  title: string;
  problem: string;
  outcome: string;
  deliverables: string[];
}

export const capabilities: Capability[] = [
  {
    id: "clinical-systems",
    title: "Clinical & patient systems",
    problem: "Paper registers lose patients between the front desk and the consulting room.",
    outcome: "One patient record that survives bad networks, shared terminals and a busy Monday.",
    deliverables: ["Patient records", "Appointments & queues", "Role-based access", "Audit trails"],
  },
  {
    id: "pharmacy-inventory",
    title: "Pharmacy & inventory",
    problem: "Stock truth lives in three spreadsheets and one person's memory.",
    outcome:
      "Batches, expiry dates and branch transfers that reconcile without a month-end scramble.",
    deliverables: [
      "Batch & expiry tracking",
      "Multi-branch stock",
      "Purchase orders",
      "Low-stock alerts",
    ],
  },
  {
    id: "business-platforms",
    title: "Business platforms & dashboards",
    problem: "Decisions get made on gut feel because the numbers arrive too late.",
    outcome: "A dashboard that answers the week's questions before someone asks them out loud.",
    deliverables: [
      "Operational dashboards",
      "Reporting exports",
      "Internal tooling",
      "Approvals & workflow",
    ],
  },
  {
    id: "integration",
    title: "APIs & integrations",
    problem: "Payments, SMS and lab results each live in their own silo.",
    outcome: "Typed contracts, retries and logs — so an integration fails loudly, never silently.",
    deliverables: ["REST APIs", "Mobile money & payments", "SMS notifications", "Third-party sync"],
  },
];
