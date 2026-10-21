import { Check } from "lucide-react";
import { capabilities } from "@/content/capabilities";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Capabilities() {
  return (
    <Section id="what-i-build">
      <div className="shell">
        <SectionHeading
          eyebrow="What I build"
          title={
            <>
              Four kinds of problem,{" "}
              <span className="text-rose italic">one standard of delivery.</span>
            </>
          }
          description="Not a list of technologies — a list of situations I have been trusted with, and what changes for the people using the system afterwards."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.id} delay={index * 0.06} className="h-full">
              <article className="card-interactive flex h-full flex-col gap-5 p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-bone text-lg">{capability.title}</h3>
                  <span className="text-stone font-mono text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="border-line-strong text-stone border-l-2 pl-4 text-[13px] leading-relaxed">
                  {capability.problem}
                </p>

                <p className="text-pale text-[15px] leading-relaxed">{capability.outcome}</p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {capability.deliverables.map((item) => (
                    <li
                      key={item}
                      className="border-line bg-canvas/40 text-mist inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px]"
                    >
                      <Check className="text-rose size-3" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
