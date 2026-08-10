import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import {
  Section,
  SectionHeading,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/site/primitives";
import { Counter } from "@/components/site/counter";
import { FinalCta } from "@/components/site/final-cta";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About SYNTROXI — Building the future of work" },
      {
        name: "description",
        content:
          "SYNTROXI builds AI Employees and Connected Business Systems for companies that intend to operate at a different speed.",
      },
      { property: "og:title", content: "About SYNTROXI — Building the future of work" },
      { property: "og:description", content: "Our thesis, principles and timeline." },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About SYNTROXI — Building the future of work" },
      { name: "twitter:description", content: "Our thesis, principles and timeline." },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/about" }],
  }),
});

const principles = [
  {
    t: "AI that executes",
    d: "AI Employees are built to complete real business tasks, not just generate responses.",
  },
  {
    t: "Intelligence with context",
    d: "Every action is informed by business context, goals, and existing workflows.",
  },
  {
    t: "Autonomy with control",
    d: "AI takes on more responsibility as reliability and accuracy are proven.",
  },
  {
    t: "Humans stay in control",
    d: "AI handles execution while people oversee important decisions and outcomes.",
  },
];

const timeline = [
  {
    year: "2026",
    t: "The Vision",
    d: "AI Business Operating System envisioned to transform business operations.",
  },
  {
    year: "2026",
    t: "AI Orchestrator",
    d: "Core orchestration layer developed to coordinate AI Employees.",
  },
  {
    year: "2026",
    t: "Sales & Marketing AI",
    d: "Working prototypes completed for sales and marketing workflows.",
  },
  {
    year: "2026 →",
    t: "AI Workforce",
    d: "Expanding into Finance, HR, Support, Operations and more.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We are building the operating layer for digital labour."
        description="SYNTROXI exists because software told teams what to do for thirty years. It should do the work instead."
      />

      <Section>
        <Stagger className="grid gap-8 border-b border-border pb-16 md:grid-cols-4">
          {[
            { v: "01", l: "AI Orchestrator" },
            { v: "02", l: "AI Employees" },
            { v: "03", l: "Working Prototypes" },
            { v: <Counter to={6} suffix="+" />, l: "Planned AI Functions" },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <p className="font-display text-3xl font-semibold text-navy">{s.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h3 className="text-lg font-semibold">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Timeline" title="Building the future of work." className="mb-14" />
        <ol className="border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <li className="relative pb-10">
                <span className="absolute -left-[2.35rem] mt-1 h-3 w-3 rounded-full border-2 border-electric bg-background" />
                <p className="font-display text-sm font-semibold text-electric">{t.year}</p>
                <p className="mt-1 text-base font-semibold text-navy">{t.t}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <FinalCta />
    </>
  );
}
