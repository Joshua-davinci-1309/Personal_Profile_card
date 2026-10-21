import { Clock, Check } from "lucide-react";
import type { Service } from "@/content/services";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card flex h-full flex-col gap-5 p-7">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-bone text-lg">{service.title}</h2>
        <Badge tone="muted" className="shrink-0">
          <Clock className="size-3" aria-hidden />
          Coming soon
        </Badge>
      </div>

      <p className="text-mist text-[13.5px] leading-relaxed">{service.summary}</p>

      <div className="flex flex-col gap-2">
        <p className="text-stone text-[11px] tracking-[0.18em] uppercase">What you get</p>
        <ul className="flex flex-col gap-2">
          {service.includes.map((item) => (
            <li key={item} className="text-pale flex gap-2 text-[13px] leading-relaxed">
              <Check className="text-rose mt-0.5 size-3.5 shrink-0" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="border-line/80 text-stone mt-auto border-t pt-4 text-[12.5px] leading-relaxed">
        <span className="text-stone">Best for: </span>
        {service.idealFor}
      </p>
    </article>
  );
}
