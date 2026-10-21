import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-60" />
      <div className="shell relative flex min-h-[70svh] flex-col items-start justify-center gap-6 py-20">
        <p className="eyebrow">Error 404</p>
        <h1 className="display max-w-2xl text-4xl sm:text-5xl">
          This page went <span className="text-rose italic">offline.</span>
        </h1>
        <p className="text-mist max-w-md text-[15px] leading-relaxed">
          The link is broken, the page moved, or it was never built. Either way, nothing you need is
          behind this door.
        </p>
        <ButtonLink href="/" size="lg">
          <ArrowLeft className="size-4" aria-hidden />
          Back to the homepage
        </ButtonLink>
      </div>
    </section>
  );
}
