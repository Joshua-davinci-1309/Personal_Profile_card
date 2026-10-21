import { ArrowRight } from "lucide-react";
import { posts } from "@/content/posts";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function WritingPreview() {
  return (
    <Section id="writing" className="bg-canvas-soft/40">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Field notes"
            title={
              <>
                Writing about the work, <span className="text-rose italic">not the tools.</span>
              </>
            }
            description="Long-form notes on building software in Zambia: connectivity, payment rails, and the design decisions that survive contact with a real clinic."
          />
          <ButtonLink href="/blog" variant="secondary" className="shrink-0">
            All notes
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06} className="h-full">
              <article className="card-interactive flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-stone text-[11px] tracking-[0.18em] uppercase">
                    {post.category}
                  </span>
                  <Badge tone="muted">Coming soon</Badge>
                </div>
                <h3 className="text-bone text-[17px] leading-snug">{post.title}</h3>
                <p className="text-mist text-[13px] leading-relaxed">{post.excerpt}</p>
                <p className="text-stone mt-auto pt-2 text-[11.5px]">
                  {post.readingTime} read · in the works
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
