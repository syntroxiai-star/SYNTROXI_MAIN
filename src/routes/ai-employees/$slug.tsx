import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Reveal, Stagger, StaggerItem } from "@/components/site/primitives";
import { SxButton } from "@/components/site/sx-button";
import { EmployeeCard } from "@/components/site/employee-card";
import { FinalCta } from "@/components/site/final-cta";
import { employees } from "@/lib/site-data";

export const Route = createFileRoute("/ai-employees/$slug")({
  loader: ({ params }) => {
    const employee = employees.find((e) => e.slug === params.slug);
    if (!employee) throw notFound();
    return { name: employee.name, role: employee.role, summary: employee.summary };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "AI Employee"} — ${loaderData?.role ?? ""} | SYNTROXI` },
      { name: "description", content: loaderData?.summary ?? "SYNTROXI AI Employee" },
      { property: "og:title", content: `${loaderData?.name} — ${loaderData?.role} | SYNTROXI` },
      { property: "og:description", content: loaderData?.summary ?? "" },
      { property: "og:type", content: "product" },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: `https://syntroxi.com/ai-employees/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `https://syntroxi.com/ai-employees/${params.slug}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: loaderData?.name ?? "AI Employee",
          description: loaderData?.summary ?? "",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          author: {
            "@type": "Organization",
            name: "SYNTROXI",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://syntroxi.com/" },
            { "@type": "ListItem", position: 2, name: "AI Employees", item: "https://syntroxi.com/ai-employees" },
            { "@type": "ListItem", position: 3, name: loaderData?.name ?? "AI Employee", item: `https://syntroxi.com/ai-employees/${params.slug}` },
          ],
        }),
      },
    ],
  }),
  component: EmployeeDetail,
});

function EmployeeDetail() {
  const { slug } = Route.useParams();
  const employee = employees.find((e) => e.slug === slug)!;
  const others = employees.filter((e) => e.slug !== slug).slice(0, 3);
  const Icon = employee.icon;

  return (
    <>
      <PageHero
        eyebrow={employee.category}
        title={`${employee.name} — ${employee.role}`}
        description={employee.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <SxButton to="/checkout">Coming soon</SxButton>
          <SxButton to="/contact" variant="outline">
            Book a walkthrough
          </SxButton>
          <span className="ml-1 text-sm text-muted-foreground">
            from <span className="font-semibold text-navy">${employee.price}</span>/month
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold">What {employee.name} owns</h2>
              <ul className="mt-7 space-y-4">
                {employee.capabilities.map((c) => (
                  <li key={c} className="flex gap-3 text-[0.95rem] text-muted-foreground">
                    <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-electric" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="text-2xl font-semibold">How the work runs</h2>
              <ol className="mt-8 space-y-6 border-l border-border pl-8">
                {employee.workflow.map((w, i) => (
                  <li key={w.title} className="relative">
                    <span className="absolute -left-[2.3rem] flex h-6 w-6 items-center justify-center rounded-full bg-electric-soft text-[0.6875rem] font-semibold text-electric">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-navy">{w.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{w.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-soft">
                  <Icon className="h-5 w-5 text-electric" />
                </div>
                <p className="mt-6 text-sm font-semibold text-navy">Performance benchmarks</p>
                <dl className="mt-5 space-y-4">
                  {employee.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between">
                      <dt className="text-sm text-muted-foreground">{m.label}</dt>
                      <dd className="text-sm font-semibold text-navy">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <p className="text-sm font-semibold text-navy">Native integrations</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {employee.integrations.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-navy-soft"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Pairs well with</h2>
          <Link
            to="/ai-employees"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-electric"
          >
            <ArrowLeft className="h-4 w-4" /> All employees
          </Link>
        </div>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {others.map((e) => (
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
