import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Stagger, StaggerItem } from "@/components/site/primitives";
import { EmployeeCard } from "@/components/site/employee-card";
import { FinalCta } from "@/components/site/final-cta";
import { employees } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-employees/")({
  component: AiEmployees,
  head: () => ({
    meta: [
      { title: "AI Employees Marketplace — SYNTROXI" },
      {
        name: "description",
        content:
          "Browse SYNTROXI AI Employees for support, revenue, marketing, finance, operations and data. Each role ships with integrations and guardrails.",
      },
      { property: "og:title", content: "AI Employees Marketplace — SYNTROXI" },
      {
        property: "og:description",
        content: "Deploy autonomous AI Employees across support, revenue, finance and operations.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/ai-employees" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/ai-employees" }],
  }),
});

function AiEmployees() {
  const categories = ["All", ...Array.from(new Set(employees.map((e) => e.category)))];
  const [active, setActive] = useState("All");
  const list = active === "All" ? employees : employees.filter((e) => e.category === active);

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="A roster of digital employees, ready to be staffed."
        description="Every role arrives pre-trained on the function, then learns your systems, tone and thresholds during a two-week deployment."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                active === c
                  ? "border-transparent bg-navy text-primary-foreground"
                  : "border-border text-navy-soft hover:border-electric hover:text-electric",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <Stagger key={active} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <StaggerItem key={e.slug}>
              <EmployeeCard employee={e} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FinalCta />
    </>
  );
}
