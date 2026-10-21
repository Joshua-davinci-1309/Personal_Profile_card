import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { stack } from "@/content/stack";
import { ButtonLink } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="aurora pointer-events-none absolute inset-0" />
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="from-canvas pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent"
      />

      <div className="shell relative grid gap-16 pt-16 pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pt-24 lg:pb-28">
        <Reveal>
          <div className="flex flex-col items-start gap-7">
            <div className="text-mist flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px]">
              <span className="inline-flex items-center gap-2">
                <StatusDot />
                {site.availability.status}
              </span>
              <span className="bg-line-strong h-3 w-px" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="text-stone size-3.5" aria-hidden />
                {site.location.city}, {site.location.country}
              </span>
            </div>

            <h1 className="display text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
              Health-care grade software, <span className="text-rose italic">shipped on time.</span>
            </h1>

            <p className="text-mist max-w-xl text-[15px] leading-relaxed sm:text-base">
              I&apos;m {site.name} — a full-stack developer in {site.location.city},{" "}
              {site.location.country}. For three years I&apos;ve designed and built the systems
              clinics, pharmacies and growing businesses run their day on: patient records, stock
              control, dashboards and the APIs behind them. Delivered countrywide, without drama.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowUpRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                See how I work
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            <ul className="text-stone flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[11.5px] tracking-[0.02em]">
              {stack.map((item, index) => (
                <li key={item.name} className="inline-flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="bg-line-strong size-1 rounded-full" />
                  ) : null}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="border-line/70 absolute -inset-3 rotate-[-1.2deg] rounded-[34px] border"
            />
            <div className="border-line bg-surface relative overflow-hidden rounded-[28px] border shadow-[var(--shadow-lift)]">
              <Image
                src="/portrait.jpg"
                alt={`${site.name}, full-stack web developer`}
                width={900}
                height={1125}
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="from-canvas via-canvas/25 absolute inset-0 bg-gradient-to-t to-transparent"
              />
              <div className="border-line/70 bg-canvas/70 absolute inset-x-4 bottom-4 rounded-2xl border px-4 py-3 backdrop-blur-md">
                <p className="text-bone text-sm font-medium">{site.name}</p>
                <p className="text-stone text-[11px] tracking-[0.14em] uppercase">{site.role}</p>
              </div>
            </div>

            <div className="border-line-strong bg-canvas/80 absolute -top-3 -right-2 rounded-2xl border px-3 py-2 backdrop-blur-md sm:-right-4">
              <p className="font-display text-rose text-lg leading-none">3+</p>
              <p className="text-stone mt-0.5 text-[10px] tracking-[0.16em] uppercase">
                years shipping
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
