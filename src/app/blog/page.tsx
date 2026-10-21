import type { Metadata } from "next";
import { ArrowUpRight, PenLine } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { posts } from "@/content/posts";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { PostRow } from "@/components/blog/post-row";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Field notes on building health-care and business software in Zambia: connectivity, payment rails, Next.js, Spring Boot and the decisions that survive production.",
  path: "/blog",
  keywords: ["software engineering Zambia", "Next.js notes", "health information systems"],
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title={
          <>
            Notes from the build, <span className="text-rose italic">published slowly.</span>
          </>
        }
        description="Everything here is written from projects that shipped. Expect architecture decisions, post-mortems and the boring details that decide whether a system survives its first rainy season."
      >
        <p className="border-line bg-surface/50 text-mist inline-flex items-start gap-2 rounded-xl border px-4 py-3 text-[13px] leading-relaxed">
          <PenLine className="text-rose mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            Three pieces are being written now. If you want them in your inbox the day they land,{" "}
            <a
              href="/contact"
              className="text-bone decoration-rose/60 underline underline-offset-4"
            >
              send me a note
            </a>{" "}
            and I will add you to the list.
          </span>
        </p>
      </PageHeader>

      <Section bordered={false}>
        <div className="shell">
          <div className="border-line flex items-baseline justify-between gap-6 border-b pb-5">
            <h2 className="text-stone text-sm tracking-[0.16em] uppercase">In the works</h2>
            <span className="text-stone text-[12px]">{posts.length} upcoming</span>
          </div>

          <div className="mt-2">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>

          <div className="border-line bg-surface/40 mt-14 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-bone text-lg">Want a specific topic covered?</h2>
              <p className="text-mist mt-1 text-[13px]">
                Connectivity, payments, clinical workflows, hiring a developer — ask and I will
                write it up.
              </p>
            </div>
            <ButtonLink href="/contact" variant="secondary">
              Suggest a topic
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
