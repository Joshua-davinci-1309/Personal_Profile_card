import { principles } from "@/content/principles";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Principles() {
  return (
    <Section id="how-i-work">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading
          eyebrow="How I work"
          title={
            <>
              No delays. <span className="text-rose italic">No surprises.</span>
            </>
          }
          description="Four commitments I will happily be held to — they are the reason clients come back rather than shop around."
        />

        <div className="border-line bg-line/60 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.id} delay={index * 0.05} className="h-full">
              <div className="bg-canvas h-full p-7">
                <p className="text-stone font-mono text-[11px]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-bone mt-4 text-[17px] leading-snug">{principle.title}</h3>
                <p className="text-mist mt-3 text-[13.5px] leading-relaxed">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
