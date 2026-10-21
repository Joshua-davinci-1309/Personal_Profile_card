export type PostStatus = "published" | "coming-soon";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  status: PostStatus;
  /** ISO date once published; null while the piece is still being written. */
  publishedAt: string | null;
}

/**
 * The writing pipeline. Posts land here first, with `status: "coming-soon"`,
 * so the blog route and the homepage preview stay in sync automatically.
 */
export const posts: Post[] = [
  {
    slug: "patient-records-offline",
    title: "Designing a patient record system for intermittent connectivity",
    excerpt:
      "Most Zambian clinics do not have a reliable uplink. Here is the write-up of the queue-and-sync model I use so staff never lose a registration to a dropped connection.",
    category: "Field notes",
    readingTime: "9 min",
    status: "coming-soon",
    publishedAt: null,
  },
  {
    slug: "nextjs-in-health-care",
    title: "Why I build health-care interfaces in Next.js",
    excerpt:
      "Server rendering, route-level budgets and the ability to ship a static shell — mapped against the realities of a clinic front desk and a mid-range Android device.",
    category: "Frontend",
    readingTime: "7 min",
    status: "coming-soon",
    publishedAt: null,
  },
  {
    slug: "contract-first-spring-react",
    title: "Contract-first: wiring Spring Boot to React without surprises",
    excerpt:
      "A practical workflow for keeping a Java backend and a TypeScript frontend honest — generated types, validation at the edge and the error envelope I reuse on every project.",
    category: "Architecture",
    readingTime: "11 min",
    status: "coming-soon",
    publishedAt: null,
  },
];

export const publishedPosts = posts.filter((post) => post.status === "published");
export const upcomingPosts = posts.filter((post) => post.status === "coming-soon");
