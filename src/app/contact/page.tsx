import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { ContactBoard } from "@/components/contact/contact-board";
import { StatusDot } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Joshua Mwelwa — full-stack developer in Ndola, Zambia. Health-care systems, business platforms and integrations. Replies within one business day.",
  path: "/contact",
  keywords: ["hire developer Zambia", "contact Joshua Mwelwa", "freelance developer Ndola"],
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: `${site.location.city}, ${site.location.country}`,
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.availability.workingHours,
    href: null,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell me what is <span className="text-rose italic">breaking.</span>
          </>
        }
        description="Whether it is a system that needs building, a build that needs rescuing, or a second opinion before you commit — I answer every serious enquiry myself."
      />

      <Section bordered={false}>
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-mist inline-flex items-center gap-2 text-[12.5px]">
                <StatusDot />
                {site.availability.status}
              </p>
              <p className="text-pale text-[15px] leading-relaxed">
                {site.availability.responseTime}. Every project starts with a conversation about the
                problem — not a sales deck.
              </p>
            </div>

            <ul className="border-line bg-line/60 flex flex-col gap-px overflow-hidden rounded-2xl border">
              {channels.map((channel) => {
                const content = (
                  <>
                    <span className="border-line bg-canvas text-stone grid size-9 shrink-0 place-items-center rounded-lg border">
                      <channel.icon className="size-4" aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-stone text-[11px] tracking-[0.16em] uppercase">
                        {channel.label}
                      </span>
                      <span className="text-bone truncate text-[13.5px]">{channel.value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.label} className="bg-canvas">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="hover:bg-surface/60 flex items-center gap-4 px-5 py-4 transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 px-5 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-4">
              <h2 className="eyebrow">Elsewhere</h2>
              <SocialLinks />
              <p className="text-stone text-[12.5px] leading-relaxed">
                Code, work history and build logs. Profiles are being tidied up — the links below
                are the ones I actually read.
              </p>
            </div>
          </div>

          <ContactBoard />
        </div>
      </Section>
    </>
  );
}
