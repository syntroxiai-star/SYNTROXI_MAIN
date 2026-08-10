import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/primitives";
import { PricingCards } from "@/components/site/pricing-cards";
import { RoiCalculator } from "@/components/site/roi-calculator";
import { FinalCta } from "@/components/site/final-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — SYNTROXI AI Employees" },
      {
        name: "description",
        content:
          "Transparent plans for deploying AI Employees: Launch, Scale and Enterprise, billed monthly or annually.",
      },
      { property: "og:title", content: "Pricing — SYNTROXI AI Employees" },
      {
        property: "og:description",
        content: "Launch, Scale and Enterprise plans for AI workforce deployment.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/pricing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }),
      },
    ],
  }),
});

const faqs = [
  {
    q: "How is an AI Employee priced?",
    a: "Each employee has a base monthly rate covering its role, integrations and guardrails. Plans bundle employees with platform capabilities and support levels.",
  },
  {
    q: "How long does deployment take?",
    a: "A single employee typically goes live in two weeks: one week mapping systems and context, one week supervised operation before autonomy is expanded.",
  },
  {
    q: "Which payment methods are supported?",
    a: "Cards and bank transfer via Stripe globally, and Razorpay for India including UPI and NetBanking. Annual contracts can be invoiced.",
  },
  {
    q: "What happens if an employee is unsure?",
    a: "Confidence thresholds route the task to a human with a full brief. Nothing irreversible happens without the approvals you configure.",
  },
];

function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pay for outcomes, not seats."
        description="Start with one role. Expand when the numbers make the decision obvious."
      />
      <Section tight>
        <PricingCards />
      </Section>
      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Business case" title="Model your return." className="mb-14" />
        <RoiCalculator />
      </Section>
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions worth answering." className="mb-10" />
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-medium text-navy">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
      <FinalCta />
    </>
  );
}
