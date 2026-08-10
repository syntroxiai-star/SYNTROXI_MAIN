import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { plans } from "@/lib/site-data";
import { SxButton } from "./sx-button";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

export function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <Reveal className="flex justify-center">
        <div className="hairline inline-flex rounded-full bg-secondary p-1">
          {[
            { label: "Monthly", v: false },
            { label: "Annual · save 17%", v: true },
          ].map((o) => (
            <button
              key={o.label}
              onClick={() => setAnnual(o.v)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                annual === o.v ? "text-white" : "text-navy-soft hover:text-navy",
              )}
            >
              {annual === o.v ? (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl border p-8 transition-shadow duration-500",
                p.highlighted
                  ? "border-transparent gradient-navy text-white shadow-lift"
                  : "border-border bg-card shadow-soft hover:shadow-lift",
              )}
            >
              {p.highlighted ? (
                <span className="mb-6 w-fit rounded-full bg-white/15 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]">
                  Most deployed
                </span>
              ) : null}
              <h3 className={cn("text-xl font-semibold", p.highlighted && "text-white")}>
                {p.name}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm",
                  p.highlighted ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {p.tagline}
              </p>

              <div className="mt-8 flex items-baseline gap-1.5">
                {p.price ? (
                  <>
                    <span
                      className={cn(
                        "font-display text-4xl font-semibold tracking-tight",
                        p.highlighted ? "text-white" : "text-navy",
                      )}
                    >
                      $
                      {annual
                        ? Math.round(p.annual! / 12).toLocaleString()
                        : p.price.toLocaleString()}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        p.highlighted ? "text-white/60" : "text-muted-foreground",
                      )}
                    >
                      /month
                    </span>
                  </>
                ) : (
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold tracking-tight",
                      p.highlighted ? "text-white" : "text-navy",
                    )}
                  >
                    Custom
                  </span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        p.highlighted ? "text-white" : "text-electric",
                      )}
                    />
                    <span className={p.highlighted ? "text-white/85" : "text-muted-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <SxButton
                to={p.price ? "/checkout" : "/contact"}
                variant={p.highlighted ? "light" : "outline"}
                className="mt-9 w-full"
              >
                Coming soon
              </SxButton>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
