import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { ArrowRight, Blocks, Gauge, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/site/hero";
import {
  Section,
  SectionHeading,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/site/primitives";
import { EmployeeCard } from "@/components/site/employee-card";
import { SystemHub } from "@/components/site/system-hub";
import { JourneyFlow } from "@/components/site/journey-flow";
import { IndustryCards } from "@/components/site/industry-cards";
import { WorkflowAnimation } from "@/components/site/workflow-animation";
import { PricingCards } from "@/components/site/pricing-cards";
import { Testimonials, LogoRow } from "@/components/site/testimonials";
import { FinalCta } from "@/components/site/final-cta";
import { SxButton } from "@/components/site/sx-button";
import { caseStudies, employees } from "@/lib/site-data";

const TeamBuilderWizard = lazy(() =>
  import("@/components/site/team-builder-wizard").then((module) => ({
    default: module.TeamBuilderWizard,
  })),
);
const WorkforceBuilder = lazy(() =>
  import("@/components/site/workforce-builder").then((module) => ({
    default: module.WorkforceBuilder,
  })),
);
const RoiCalculator = lazy(() =>
  import("@/components/site/roi-calculator").then((module) => ({ default: module.RoiCalculator })),
);
const DashboardPreview = lazy(() =>
  import("@/components/site/dashboard-preview").then((module) => ({
    default: module.DashboardPreview,
  })),
);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "SYNTROXI — Hire AI Employees That Run Your Business" },
      {
        name: "description",
        content:
          "SYNTROXI is the AI workforce platform: autonomous AI Employees deployed onto connected business systems across CRM, ERP, support and finance.",
      },
      { property: "og:title", content: "SYNTROXI — Hire AI Employees That Run Your Business" },
      {
        property: "og:description",
        content:
          "Autonomous AI Employees deployed onto your connected business systems. Work gets finished, not just answered.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/" }],
  }),
});

const pillars = [
  {
    icon: Blocks,
    title: "Employees, not chatbots",
    detail:
      "Each employee owns a role with objectives, permissions and reporting lines — measured on outcomes.",
  },
  {
    icon: Gauge,
    title: "Connected by default",
    detail:
      "One governed context graph across every system helps keep decisions grounded in shared context.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise control",
    detail: "Approvals, least-privilege actions and replayable audit trails on every decision.",
  },
];

function Home() {
  return (
    <>
      <Hero />

      <Section>
        <SectionHeading
          eyebrow="The difference"
          title="A workforce, engineered."
          description="Most AI tools produce text. SYNTROXI produces completed work — inside the systems your business already runs on."
          align="center"
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-electric-soft">
                  <p.icon className="h-5 w-5 text-electric" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-secondary/40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Marketplace"
            title="Meet the AI Employees."
            description="Deploy one role or an entire function. Every employee ships with integrations, guardrails and a measurable mandate."
          />
          <SxButton to="/ai-employees" variant="outline">
            View all roles <ArrowRight className="h-4 w-4" />
          </SxButton>
        </div>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employees.slice(0, 6).map((e) => (
            <StaggerItem key={e.slug}>
              <EmployeeCard employee={e} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Connected systems"
          title="One context graph behind every decision."
          description="We map your systems into a single governed layer, then give employees the permission to act on it."
          align="center"
          className="mb-16"
        />
        <SystemHub />
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="How it works"
          title="From lead to closed deal."
          description="Watch AI Employees collaborate across your business systems to finish complex workflows end to end."
          align="center"
          className="mb-14"
        />
        <JourneyFlow />
        <div className="mt-16">
          <WorkflowAnimation />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Workforce builder"
          title="Build your AI team."
          description="Select your company size, choose departments, and pick AI Employees. We calculate everything instantly."
          align="center"
          className="mb-14"
        />
        <Suspense
          fallback={<div className="min-h-[240px] rounded-3xl border border-border bg-card/70" />}
        >
          <TeamBuilderWizard />
        </Suspense>
        <div className="mt-16">
          <Suspense
            fallback={<div className="min-h-[220px] rounded-3xl border border-border bg-card/70" />}
          >
            <WorkforceBuilder />
          </Suspense>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Built for every industry."
          description="SYNTROXI AI Employees adapt to your industry's workflows, compliance requirements and operational challenges."
          align="center"
          className="mb-14"
        />
        <IndustryCards />
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="ROI calculator"
          title="Model the business case in seconds."
          align="center"
          className="mb-14"
        />
        <Suspense
          fallback={<div className="min-h-[260px] rounded-3xl border border-border bg-card/70" />}
        >
          <RoiCalculator />
        </Suspense>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Client portal"
          title="Every outcome, visible."
          description="Your dashboard reports digital labour like a real function: throughput, quality, escalations and cost per outcome."
          align="center"
          className="mb-14"
        />
        <Suspense
          fallback={<div className="min-h-[320px] rounded-3xl border border-border bg-card/70" />}
        >
          <DashboardPreview />
        </Suspense>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with headcount."
          align="center"
          className="mb-4"
        />
        <div className="mt-12">
          <PricingCards />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Case studies"
          title="Proof, not projections."
          align="center"
          className="mb-14"
        />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                to="/case-studies"
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <p className="eyebrow">{c.industry}</p>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{c.headline}</h3>
                <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-5">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="text-sm font-semibold text-navy">{m.value}</dd>
                      <dt className="text-[0.6875rem] leading-tight text-muted-foreground">
                        {m.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-14">
          <Testimonials />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
