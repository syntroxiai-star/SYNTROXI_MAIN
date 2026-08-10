import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { SystemsVisual } from "@/components/site/systems-visual";
import { SystemHub } from "@/components/site/system-hub";
import { WorkflowAnimation } from "@/components/site/workflow-animation";
import { JourneyFlow } from "@/components/site/journey-flow";
import { FinalCta } from "@/components/site/final-cta";
import { SxButton } from "@/components/site/sx-button";
import { systems } from "@/lib/site-data";

export const Route = createFileRoute("/connected-systems")({
  component: ConnectedSystems,
  head: () => ({
    meta: [
      { title: "Connected Business Systems — SYNTROXI" },
      {
        name: "description",
        content:
          "One governed context graph across CRM, ERP, warehouse and docs, with an action layer that lets AI Employees write back safely.",
      },
      { property: "og:title", content: "Connected Business Systems — SYNTROXI" },
      {
        property: "og:description",
        content: "The unified data, action, control and handoff layers behind every AI Employee.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/connected-systems" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/connected-systems" }],
  }),
});

const integrations = [
  "Salesforce",
  "HubSpot",
  "NetSuite",
  "SAP",
  "Snowflake",
  "BigQuery",
  "Postgres",
  "Shopify",
  "Zendesk",
  "Intercom",
  "Slack",
  "Notion",
  "Stripe",
  "Razorpay",
  "Twilio",
  "Google Workspace",
];

function ConnectedSystems() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Connected Business Systems."
        description="AI is only as good as the context it acts on. We build the connective layer first — then staff it."
      >
        <SxButton to="/contact">Map my systems</SxButton>
      </PageHero>

      <Section>
        <>
          <SystemHub />
          <div className="mt-20">
            <SystemsVisual />
          </div>
        </>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Architecture"
          title="Four layers, one system of record."
          className="mb-14"
        />
        <Stagger className="grid gap-6 md:grid-cols-2">
          {systems.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
                <span className="font-display text-sm font-semibold text-electric">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="In motion"
          title="From signal to finished work."
          className="mb-14"
        />
        <>
          <JourneyFlow />
          <div className="mt-16">
            <WorkflowAnimation />
          </div>
        </>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Integrations"
          title="Connected to the tools you already run."
          description="Native connectors plus a typed API for anything bespoke. No middleware sprawl."
          className="mb-14"
        />
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-navy shadow-soft transition-colors hover:border-electric/40">
                {i}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FinalCta />
    </>
  );
}
