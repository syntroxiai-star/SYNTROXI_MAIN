import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/primitives";
import { WorkforceBuilder } from "@/components/site/workforce-builder";
import { TeamBuilderWizard } from "@/components/site/team-builder-wizard";
import { RoiCalculator } from "@/components/site/roi-calculator";
import { FinalCta } from "@/components/site/final-cta";

export const Route = createFileRoute("/workforce-builder")({
  component: BuilderPage,
  head: () => ({
    meta: [
      { title: "AI Workforce Builder — SYNTROXI" },
      {
        name: "description",
        content:
          "Design your AI workforce role by role, model coverage and monthly cost, then project the annual business case.",
      },
      { property: "og:title", content: "AI Workforce Builder — SYNTROXI" },
      {
        property: "og:description",
        content: "Model coverage, spend and ROI before you deploy a single AI Employee.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/workforce-builder" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/workforce-builder" }],
  }),
});

function BuilderPage() {
  return (
    <>
      <PageHero
        eyebrow="Workforce builder"
        title="Build the team before you hire it."
        description="Pick the roles, see coverage and cost, then take the modelled plan straight to checkout."
      />

      <Section>
        <SectionHeading
          eyebrow="Build your AI team"
          title="Five steps to a staffed function."
          description="Select your company size, choose departments, pick AI Employees and connect systems. We calculate everything instantly."
          align="center"
          className="mb-14"
        />
        <TeamBuilderWizard />
        <div className="mt-20">
          <WorkforceBuilder />
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="ROI calculator"
          title="What this replaces, in money."
          align="center"
          className="mb-14"
        />
        <RoiCalculator />
      </Section>

      <FinalCta />
    </>
  );
}
