import type { Metadata } from "next";
import { ArrowUpRight, Info } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/services/service-card";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { CtaBand } from "@/components/home/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Health-care systems, business platforms, API and integration engineering, UI engineering and maintenance — what Joshua Mwelwa builds for teams in Zambia.",
  path: "/services",
  keywords: ["health care systems Zambia", "business platform development", "API integration"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            What I can take <span className="text-rose italic">off your plate.</span>
          </>
        }
        description="Each engagement starts with a problem, not a technology. Below is the work I take on, what it includes, and who it suits — detailed pages, pricing and case studies are on the way."
      >
        <p className="border-line bg-surface/50 text-mist inline-flex items-start gap-2 rounded-xl border px-4 py-3 text-[13px] leading-relaxed">
          <Info className="text-rose mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            Service pages are being written. In the meantime,{" "}
            <a
              href="/contact"
              className="text-bone decoration-rose/60 underline underline-offset-4"
            >
              book a discovery call
            </a>{" "}
            and I will walk you through the scope for your case.
          </span>
        </p>
      </PageHeader>

      <Section bordered={false}>
        <div className="shell grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}

          <article className="border-line-strong bg-canvas/40 flex h-full flex-col justify-between gap-6 rounded-2xl border border-dashed p-7">
            <div className="flex flex-col gap-3">
              <h2 className="text-bone text-lg">Something else?</h2>
              <p className="text-mist text-[13.5px] leading-relaxed">
                Most of the work starts as an odd request: a report nobody can export, a payment
                that reconciles by hand, two systems that should be talking. If it is not on this
                list, it is probably still a conversation worth having.
              </p>
            </div>
            <ButtonLink href="/contact" variant="secondary" className="w-fit">
              Describe the problem
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </article>
        </div>
      </Section>

      <Section className="bg-canvas-soft/40">
        <div className="shell">
          <SectionHeading
            eyebrow="Engagement"
            title={
              <>
                A working rhythm you can <span className="text-rose italic">plan around.</span>
              </>
            }
            description="No mystery phases and no month-long silences. You always know what is being built this fortnight and what lands next."
          />
          <div className="mt-12">
            <ProcessTimeline />
          </div>
          <p className="text-stone mt-8 max-w-2xl text-[13px] leading-relaxed">
            Typical engagements run from two weeks for a focused integration to a few months for a
            full clinical system. You get {site.availability.responseTime.toLowerCase()}, and a
            written scope before any code is written.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
