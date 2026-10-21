import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { Capabilities } from "@/components/home/capabilities";
import { StackSection } from "@/components/home/stack-section";
import { Principles } from "@/components/home/principles";
import { WritingPreview } from "@/components/home/writing-preview";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Capabilities />
      <StackSection />
      <Principles />
      <WritingPreview />
      <CtaBand />
    </>
  );
}
