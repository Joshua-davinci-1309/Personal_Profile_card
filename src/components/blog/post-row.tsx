import type { Post } from "@/content/posts";
import { Badge } from "@/components/ui/badge";

export function PostRow({ post }: { post: Post }) {
  const isComingSoon = post.status === "coming-soon";

  return (
    <article className="border-line/70 grid gap-4 border-b py-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10">
      <div className="flex flex-col gap-3">
        <div className="text-stone flex flex-wrap items-center gap-3 text-[11px] tracking-[0.18em] uppercase">
          <span>{post.category}</span>
          <span className="bg-line-strong size-1 rounded-full" aria-hidden />
          <span className="text-stone tracking-normal normal-case">{post.readingTime} read</span>
          {isComingSoon ? <Badge tone="accent">Coming soon</Badge> : null}
        </div>

        <h2 className="text-bone max-w-2xl text-xl leading-snug">{post.title}</h2>

        <p className="text-mist max-w-2xl text-[13.5px] leading-relaxed">{post.excerpt}</p>
      </div>

      <p className="text-stone hidden text-[11px] tracking-[0.18em] uppercase sm:block sm:pt-1">
        {isComingSoon ? "In draft" : "Published"}
      </p>
    </article>
  );
}
