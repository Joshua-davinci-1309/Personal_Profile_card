import {
  SiJavascript,
  SiNodedotjs,
  SiNextdotjs,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
} from "react-icons/si";
import type { StackItem } from "@/content/stack";
import { cn } from "@/lib/cn";

const icons: Record<StackItem["icon"], typeof SiReact> = {
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  springboot: SiSpringboot,
};

/**
 * Monochrome brand marks: the palette has exactly one accent, so tinting six
 * brand colours would fight the design. The shape carries the recognition.
 */
export function StackIcon({ icon, className }: { icon: StackItem["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" className={cn("size-5", className)} />;
}
