import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/primitives";
import { IndustryCards } from "@/components/site/industry-cards";
import { FinalCta } from "@/components/site/final-cta";

export const Route = createFileRoute("/industries")({
  component: Industries,
  head: () => ({
    meta: [
      { title: "Industries — SYNTROXI AI Workforce" },
      {
        name: "description",
        content:
          "How SYNTROXI AI Employees are deployed across financial services, healthcare, SaaS, manufacturing, education and travel.",
      },
      { property: "og:title", content: "Industries — SYNTROXI AI Workforce" },
      {
        property: "og:description",
        content: "Deployment patterns for regulated and high-volume operations.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/industries" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/industries" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://syntroxi.com/" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://syntroxi.com/industries" },
          ],
        }),
      },
    ],
  }),
});

function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for operations that cannot afford to be wrong."
        description="The same platform, configured to the compliance, volume and language of your sector."
      />
      <Section>
        <IndustryCards />
      </Section>
      <FinalCta />
    </>
  );
}
