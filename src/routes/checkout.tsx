import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Sparkles } from "lucide-react";
import { Section, Reveal } from "@/components/site/primitives";
import { SxButton } from "@/components/site/sx-button";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — SYNTROXI" },
      {
        name: "description",
        content: "Purchasing AI agents and packages is coming soon.",
      },
      { property: "og:title", content: "Checkout — SYNTROXI" },
      { property: "og:description", content: "Purchasing AI agents and packages is coming soon." },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/checkout" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/checkout" }],
  }),
});

function Checkout() {
  return (
    <div className="pt-28">
      <Section tight>
        <Reveal>
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold">Coming soon</h1>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-soft">
                <Sparkles className="h-5 w-5 text-electric" />
              </div>
              <p className="mt-6 text-lg font-semibold text-navy">
                Purchases for AI employees, plans, and packages are not live yet.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                This preview now intentionally shows a coming-soon state whenever someone tries to
                buy.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm text-navy">
                <Clock3 className="h-4 w-4 text-electric" />
                <span>Checkout will open once the storefront is ready.</span>
              </div>
              <SxButton to="/pricing" className="mt-8">
                Back to pricing
              </SxButton>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <p className="text-sm font-semibold text-navy">What happens next</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>• Agent purchasing is temporarily disabled.</li>
                <li>• Package checkout is intentionally hidden behind the preview state.</li>
                <li>• You can keep browsing pricing and employee details.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
