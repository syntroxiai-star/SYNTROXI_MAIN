import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, Reveal } from "@/components/site/primitives";
import { SxButton } from "@/components/site/sx-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact SYNTROXI — Book a demo" },
      {
        name: "description",
        content:
          "Talk to the SYNTROXI team about deploying AI Employees onto your connected business systems.",
      },
      { property: "og:title", content: "Contact SYNTROXI — Book a demo" },
      { property: "og:description", content: "Book a demo or request a modelled business case." },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/contact" }],
  }),
});

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's scope your first AI Employee."
        description="Tell us the function that hurts most. We'll come back with a deployment plan and a modelled business case."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form
              className="rounded-3xl border border-border bg-card p-8 shadow-soft"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                setTimeout(() => {
                  setSending(false);
                  toast.success("Thanks — our team will reply within one business day.");
                  (e.target as HTMLFormElement).reset();
                }, 700);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required className="mt-2" placeholder="Alex Mercer" />
                </div>
                <div>
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-2"
                    placeholder="alex@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" className="mt-2" placeholder="Company Inc." />
                </div>
                <div>
                  <Label htmlFor="function">Function to staff</Label>
                  <Input id="function" className="mt-2" placeholder="Support, finance, revenue…" />
                </div>
              </div>
              <div className="mt-5">
                <Label htmlFor="message">What should the employee own?</Label>
                <Textarea
                  id="message"
                  className="mt-2 min-h-32"
                  placeholder="Today our team spends most of its day…"
                />
              </div>
              <SxButton type="submit" size="lg" className="mt-7">
                {sending ? "Sending…" : "Request a demo"}
              </SxButton>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "business@syntroxi.com" },
              { icon: Phone, label: "Phone", value: "+91 9024892308" },
              { icon: MapPin, label: "Office", value: "Jaipur, Rajasthan" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-soft">
                  <c.icon className="h-4 w-4 text-electric" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-navy">{c.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl gradient-navy p-6 text-white">
              <p className="text-sm font-semibold">Deployment window</p>
              <p className="mt-2 text-sm text-white/70">
                Two weeks from kickoff to a live employee, including system mapping and supervised
                operation.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
