import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/primitives";
import { ActivityChart } from "@/components/site/dashboard-preview";
import { SxButton } from "@/components/site/sx-button";
import { employees } from "@/lib/site-data";
import { Activity, CheckCircle2, Clock, Wallet } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Workforce Dashboard — SYNTROXI" },
      {
        name: "description",
        content:
          "Monitor your AI workforce: outcomes resolved, handle time, escalations and cost per outcome in one client portal.",
      },
      { property: "og:title", content: "Workforce Dashboard — SYNTROXI" },
      { property: "og:description", content: "The SYNTROXI client portal for digital labour." },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/dashboard" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/dashboard" }],
  }),
});

const tiles = [
  { icon: CheckCircle2, label: "Outcomes resolved", value: "2,499", delta: "+18% wk" },
  { icon: Clock, label: "Median handle time", value: "42 sec", delta: "−31% wk" },
  { icon: Activity, label: "Escalation ratio", value: "4.2%", delta: "−0.8pt wk" },
  { icon: Wallet, label: "Cost per outcome", value: "$0.38", delta: "−12% wk" },
];

function Dashboard() {
  return (
    <div className="pt-28">
      <Section tight>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Client portal</p>
            <h1 className="mt-3 text-3xl font-semibold">Workforce overview</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo workspace · data shown is illustrative
            </p>
          </div>
          <SxButton to="/workforce-builder" variant="outline" size="sm">
            Add an employee
          </SxButton>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <t.icon className="h-4 w-4 text-electric" />
              <p className="mt-5 font-display text-2xl font-semibold text-navy">{t.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
              <p className="mt-3 text-[0.6875rem] font-medium text-electric">{t.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <p className="text-sm font-semibold text-navy">Outcomes this week</p>
            <ActivityChart height={300} />
          </div>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <p className="text-sm font-semibold text-navy">Active employees</p>
            <ul className="mt-5 space-y-3">
              {employees.slice(0, 4).map((e) => (
                <li key={e.slug}>
                  <Link
                    to="/ai-employees/$slug"
                    params={{ slug: e.slug }}
                    className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <span>
                      <span className="block text-sm font-medium text-navy">{e.name}</span>
                      <span className="block text-xs text-muted-foreground">{e.role}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-electric">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Live
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
