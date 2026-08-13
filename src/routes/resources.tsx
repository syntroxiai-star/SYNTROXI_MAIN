import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, Stagger, StaggerItem } from "@/components/site/primitives";
import { FinalCta } from "@/components/site/final-cta";
import { posts } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({
    meta: [
      { title: "Resources & Blog — SYNTROXI" },
      {
        name: "description",
        content:
          "Playbooks and perspectives on deploying AI Employees, connected systems architecture and measuring digital labour.",
      },
      { property: "og:title", content: "Resources & Blog — SYNTROXI" },
      {
        property: "og:description",
        content: "Playbooks on AI workforce deployment and governance.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/resources" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Resources & Blog — SYNTROXI" },
      {
        name: "twitter:description",
        content: "Playbooks on AI workforce deployment and governance.",
      },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/resources" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://syntroxi.com/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://syntroxi.com/resources" },
          ],
        }),
      },
    ],
  }),
});

function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Field notes from live deployments."
        description="What we learned building autonomous workforces inside real operations."
      />
      <Section>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="eyebrow">{p.category}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-snug">{p.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-electric">
                  Insight preview
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <FinalCta />
    </>
  );
}
