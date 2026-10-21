export type StackCategory = "frontend" | "backend";

export interface StackItem {
  name: string;
  /** Brand icon key, resolved in components/home/stack.tsx */
  icon: "javascript" | "react" | "nextjs" | "tailwind" | "node" | "springboot";
  category: StackCategory;
  /** Why it is in the toolbox — not a dictionary definition. */
  note: string;
}

export const stack: StackItem[] = [
  {
    name: "JavaScript",
    icon: "javascript",
    category: "frontend",
    note: "The language I think in; thirty lines that read like prose beat three hundred that don't.",
  },
  {
    name: "React",
    icon: "react",
    category: "frontend",
    note: "Component boundaries that still make sense after the second year of feature requests.",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    category: "frontend",
    note: "Routing, rendering strategy and performance budgets handled without a bespoke framework.",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    category: "frontend",
    note: "Design tokens live in code, so the UI cannot drift from the brand.",
  },
  {
    name: "Node.js",
    icon: "node",
    category: "backend",
    note: "APIs and integration layers that stay up, degrade kindly and log what happened.",
  },
  {
    name: "Spring Boot",
    icon: "springboot",
    category: "backend",
    note: "Where money and records move, I want transactions, typing and a boring, reliable JVM.",
  },
];

export const stackCategories: Record<StackCategory, { title: string; blurb: string }> = {
  frontend: {
    title: "Interface & product",
    blurb: "What people touch: fast pages, honest states, accessible controls.",
  },
  backend: {
    title: "Services & data",
    blurb: "What people rely on: contracts, validation, retries, logs and backups.",
  },
};
