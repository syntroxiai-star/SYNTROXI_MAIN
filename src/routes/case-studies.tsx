import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, Reveal } from "@/components/site/primitives";
import { Testimonials } from "@/components/site/testimonials";
import { FinalCta } from "@/components/site/final-cta";
import { caseStudies } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
  head: () => ({
    meta: [
      { title: "Case Studies — SYNTROXI" },
      {
        name: "description",
        content:
          "Measured outcomes from pilot deployments of SYNTROXI AI Employees in logistics, healthcare and financial services.",
      },
      { property: "og:title", content: "Case Studies — SYNTROXI" },
      {
        property: "og:description",
        content: "Measured outcomes from pilot AI workforce deployments.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Case Studies — SYNTROXI" },
      {
        name: "twitter:description",
        content: "Measured outcomes from pilot AI workforce deployments.",
      },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/case-studies" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://syntroxi.com/" },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://syntroxi.com/case-studies" },
          ],
        }),
      },
    ],
  }),
});

function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Deployments, measured honestly."
        description="Every engagement is scoped against a baseline so the impact is arguable in a board meeting."
      />
      <Section>
        <div className="space-y-6">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <article className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[1.5fr_1fr] md:p-10">
                <div>
                  <p className="eyebrow">
                    {c.company} · {c.industry}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold leading-snug">{c.headline}</h2>
                  <blockquote className="mt-6 border-l-2 border-electric pl-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    “{c.quote}”
                  </blockquote>
                  <p className="mt-4 text-xs font-medium text-navy">{c.person}</p>
                </div>
                <dl className="grid grid-cols-3 gap-4 self-start rounded-2xl bg-secondary p-6 md:grid-cols-1">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="font-display text-xl font-semibold text-navy">{m.value}</dd>
                      <dt className="mt-0.5 text-xs text-muted-foreground">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="bg-secondary/40">
        <Testimonials />
      </Section>
      <FinalCta />
    </>
  );
}
