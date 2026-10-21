"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Stagger in seconds — handy for lists. */
  delay?: number;
  className?: string;
}

/**
 * Scroll entrance as progressive enhancement.
 *
 * The content is always rendered visible; the animation is applied only to
 * blocks that are genuinely below the fold when the component mounts, and only
 * if the visitor has not asked for reduced motion. No motion library and no
 * CSS-only `opacity: 0` that could leave the page blank.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isBelowFold = element.getBoundingClientRect().top > window.innerHeight * 0.9;

    if (prefersReducedMotion || !isBelowFold) return;

    element.dataset.revealState = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          element.dataset.revealState = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: "-72px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
