import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

/** Shared masthead so every inner route opens with the same rhythm. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="border-line/70 relative overflow-hidden border-b">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative flex flex-col gap-6 py-16 sm:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          <p className="text-mist mt-5 max-w-2xl text-[15px] leading-relaxed">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
