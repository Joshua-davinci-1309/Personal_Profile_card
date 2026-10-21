"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, primaryCta } from "@/content/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll while the mobile drawer is open (an external-system sync, not state).
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);

  return (
    <header className="border-line/60 bg-canvas/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
          <span className="border-line-strong font-display text-bone group-hover:border-rose/70 group-hover:text-rose grid size-9 place-items-center rounded-lg border text-sm transition-colors duration-300">
            {site.initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-bone text-sm font-medium">{site.name}</span>
            <span className="text-stone text-[11px] tracking-[0.14em] uppercase">{site.role}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] transition-colors duration-300",
                  active ? "bg-surface text-bone" : "text-mist hover:bg-surface/50 hover:text-bone",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {primaryCta.label}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="border-line text-bone hover:border-rose/60 hover:text-rose grid size-10 place-items-center rounded-full border transition-colors md:hidden"
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            {isOpen ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="border-line/60 bg-canvas/95 border-t md:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-4">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                className={cn(
                  "flex flex-col gap-0.5 rounded-xl px-3 py-3 transition-colors",
                  active ? "bg-surface text-bone" : "text-mist hover:bg-surface/60 hover:text-bone",
                )}
              >
                <span className="text-sm">{item.label}</span>
                <span className="text-stone text-[12px]">{item.description}</span>
              </Link>
            );
          })}
          <ButtonLink
            href={primaryCta.href}
            className="mt-3 w-full"
            size="lg"
            onClick={closeDrawer}
          >
            {primaryCta.label}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
