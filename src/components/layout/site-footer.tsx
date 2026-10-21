import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line/70 bg-canvas-soft relative border-t">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex max-w-sm flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="border-line-strong font-display text-bone grid size-9 place-items-center rounded-lg border text-sm">
              {site.initials}
            </span>
            <span className="text-bone text-sm">{site.name}</span>
          </div>
          <p className="text-mist text-sm leading-relaxed">
            {site.tagline} {site.slogan}
          </p>
          <SocialLinks />
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="eyebrow">Explore</h2>
          {[...navigation].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-mist hover:text-bone w-fit text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="eyebrow">Direct</h2>
          <a
            href={`mailto:${site.email}`}
            className="text-mist hover:text-bone inline-flex items-center gap-2 text-sm transition-colors"
          >
            <Mail className="text-stone size-4" aria-hidden />
            {site.email}
          </a>
          <p className="text-mist inline-flex items-center gap-2 text-sm">
            <MapPin className="text-stone size-4" aria-hidden />
            {site.location.city}, {site.location.country}
          </p>
          <p className="text-stone text-[13px]">{site.availability.workingHours}</p>
        </div>
      </div>

      <div className="border-line/60 border-t">
        <div className="shell text-stone flex flex-col gap-2 py-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS and an unreasonable amount of care.</p>
        </div>
      </div>
    </footer>
  );
}
