import { engagementSteps } from "@/content/services";

export function ProcessTimeline() {
  return (
    <ol className="border-line bg-line/60 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
      {engagementSteps.map((step) => (
        <li key={step.step} className="bg-canvas p-7">
          <p className="text-rose font-mono text-[11px]">{step.step}</p>
          <h3 className="text-bone mt-4 text-[15px]">{step.title}</h3>
          <p className="text-mist mt-2 text-[13px] leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
