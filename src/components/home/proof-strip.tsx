import { stats } from "@/content/stats";

export function ProofStrip() {
  return (
    <section aria-label="At a glance" className="border-line/70 bg-canvas-soft/60 border-y">
      <div className="shell grid gap-px py-0 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group sm:border-line/60 flex flex-col gap-2 py-8 sm:border-l sm:px-8 sm:first:border-l-0"
          >
            <p className="text-stone text-[11px] tracking-[0.2em] uppercase">{stat.label}</p>
            <p className="font-display text-bone text-3xl">{stat.value}</p>
            <p className="text-mist max-w-[26ch] text-[13px] leading-relaxed">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
