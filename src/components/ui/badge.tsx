import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "accent" | "muted";
  className?: string;
}

const tones = {
  neutral: "border-line-strong bg-surface/60 text-pale",
  accent: "border-rose/35 bg-rose/10 text-rose",
  muted: "border-line bg-transparent text-stone",
} as const;

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small pulsing dot used next to availability copy. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)} aria-hidden="true">
      <span className="bg-rose/60 absolute inline-flex size-full animate-ping rounded-full" />
      <span className="bg-rose relative inline-flex size-2 rounded-full" />
    </span>
  );
}
