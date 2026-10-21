import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { site, type SocialKey } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Font Awesome brand glyphs, used as one consistent set.
 * (Simple Icons — used for the stack — no longer ships a LinkedIn mark.)
 */
const socialIcons: Record<SocialKey, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
};

interface SocialLinksProps {
  /** `inline` renders icon + label, `chips` renders icon-only squares. */
  variant?: "inline" | "chips";
  className?: string;
}

export function SocialLinks({ variant = "inline", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", variant === "chips" && "gap-2", className)}>
      {site.socials.map((social) => {
        const Icon = socialIcons[social.key];
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${social.label} — ${social.handle}`}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border transition duration-300",
                "border-line bg-surface/50 text-mist hover:border-rose/60 hover:text-rose hover:bg-surface",
                variant === "inline" ? "px-4 py-2 text-[13px]" : "size-10 justify-center",
              )}
            >
              <Icon
                className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              {variant === "inline" ? <span>{social.label}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
