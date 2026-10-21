import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("shell", className)}>{children}</div>;
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Adds the hairline rule that separates stacked sections. */
  bordered?: boolean;
}

export function Section({ children, id, className, bordered = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-24", bordered && "border-line/70 border-t", className)}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display max-w-2xl text-3xl sm:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("text-mist max-w-xl text-[15px] leading-relaxed")}>{description}</p>
      ) : null}
    </div>
  );
}
