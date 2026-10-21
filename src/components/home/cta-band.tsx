import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="border-line/70 relative overflow-hidden border-t">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-80" />
      <div className="shell relative py-20 sm:py-28">
        <div className="border-line-strong bg-surface/60 relative overflow-hidden rounded-[28px] border p-8 backdrop-blur-sm sm:p-14">
          <div
            aria-hidden
            className="bg-rose/10 pointer-events-none absolute -top-24 -right-16 size-72 rounded-full blur-3xl"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="eyebrow">Next step</p>
              <h2 className="display text-3xl sm:text-[2.6rem]">
                Have a system that <span className="text-rose italic">needs to work?</span>
              </h2>
              <p className="text-mist text-[15px] leading-relaxed">
                Tell me what is breaking, what is manual, or what has outgrown its spreadsheet. I
                will tell you honestly whether I am the right person to build it — and what it would
                take to ship.
              </p>
              <p className="text-stone text-[13px]">{site.availability.responseTime}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowUpRight className="size-4" aria-hidden />
              </ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="link-underline justify-center px-2 py-2 text-sm sm:justify-start"
              >
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
