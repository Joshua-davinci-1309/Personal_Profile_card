import { stack, stackCategories, type StackCategory } from "@/content/stack";
import { Section, SectionHeading } from "@/components/ui/section";
import { StackIcon } from "@/components/ui/stack-icon";
import { Reveal } from "@/components/ui/reveal";

const order: StackCategory[] = ["frontend", "backend"];

export function StackSection() {
  return (
    <Section id="stack" className="bg-canvas-soft/40">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The stack"
            title={
              <>
                Six tools. <span className="text-rose italic">Chosen on purpose.</span>
              </>
            }
            description="Every item here earns its place: it ships faster, breaks less often, or makes the next change cheaper. If it does none of those, it is not in the toolbox."
          />
          <p className="text-stone max-w-xs text-[13px] leading-relaxed lg:text-right">
            Typed end-to-end. One source of truth for data, one for design tokens, and a build that
            fails loudly instead of shipping quietly.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {order.map((category, categoryIndex) => (
            <Reveal key={category} delay={categoryIndex * 0.08} className="h-full">
              <div className="card h-full p-7">
                <div className="border-line/80 flex items-baseline justify-between gap-4 border-b pb-5">
                  <h3 className="text-bone text-base">{stackCategories[category].title}</h3>
                  <span className="text-stone text-[11px] tracking-[0.18em] uppercase">
                    {stack.filter((item) => item.category === category).length} tools
                  </span>
                </div>
                <p className="text-stone mt-4 text-[13px] leading-relaxed">
                  {stackCategories[category].blurb}
                </p>

                <ul className="mt-6 flex flex-col gap-5">
                  {stack
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <li key={item.name} className="flex gap-4">
                        <span className="border-line bg-canvas/60 text-bone grid size-10 shrink-0 place-items-center rounded-xl border">
                          <StackIcon icon={item.icon} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="text-bone text-sm font-medium">{item.name}</p>
                          <p className="text-mist text-[13px] leading-relaxed">{item.note}</p>
                        </div>
                      </li>
                    ))}
                </ul>

                {category === "backend" ? (
                  <p className="border-line/80 bg-canvas/50 text-stone mt-6 rounded-xl border p-4 text-[12.5px] leading-relaxed">
                    <span className="text-mist">The seam between the two: </span>a typed API
                    contract. Rename a field and the build fails — not a clinic at 08:00 on a
                    Monday.
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
