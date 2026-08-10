import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus, Sparkles } from "lucide-react";
import { employees } from "@/lib/site-data";
import { SxButton } from "./sx-button";
import { Counter } from "./counter";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

export function WorkforceBuilder() {
  const [picked, setPicked] = useState<string[]>(["aria-support", "sage-analyst"]);

  const team = employees.filter((e) => picked.includes(e.slug));
  const total = useMemo(() => team.reduce((s, e) => s + e.price, 0), [team]);
  const coverage = Math.min(100, 32 + team.length * 13);

  const toggle = (slug: string) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  return (
    <Reveal>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-navy">Choose the roles you want staffed</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {employees.map((e) => {
              const on = picked.includes(e.slug);
              return (
                <button
                  key={e.slug}
                  onClick={() => toggle(e.slug)}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                    on
                      ? "border-electric bg-electric-soft/60"
                      : "border-border hover:border-electric/40 hover:-translate-y-0.5",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                      on ? "bg-electric text-white" : "bg-secondary text-navy",
                    )}
                  >
                    {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-navy">{e.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{e.role}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-electric" />
            <p className="text-sm font-semibold text-navy">Your workforce</p>
          </div>

          <div className="mt-6 min-h-32 space-y-2">
            <AnimatePresence initial={false}>
              {team.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Select at least one role to model your team.
                </p>
              ) : (
                team.map((e) => (
                  <motion.div
                    key={e.slug}
                    layout
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3"
                  >
                    <span className="text-sm font-medium text-navy">{e.name}</span>
                    <span className="text-xs text-muted-foreground">${e.price}/mo</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 space-y-4 border-t border-border pt-6">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Operational coverage</span>
                <span className="text-xs font-semibold text-electric">{coverage}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-electric"
                  animate={{ width: `${coverage}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xs text-muted-foreground">Estimated monthly</span>
              <span className="font-display text-2xl font-semibold text-navy">
                <Counter to={total} prefix="$" />
              </span>
            </div>
          </div>

          <SxButton to="/checkout" className="mt-7 w-full">
            Coming soon
          </SxButton>
        </div>
      </div>
    </Reveal>
  );
}
