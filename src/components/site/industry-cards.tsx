import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { industries } from "@/lib/site-data";
import { Stagger, StaggerItem } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Industry cards where the hovered/focused card expands to reveal the
 * recommended AI Employees for that sector.
 */
export function IndustryCards() {
  const [active, setActive] = useState<string | null>(industries[1]?.name ?? null);

  return (
    <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {industries.map((i) => {
        const on = active === i.name;
        return (
          <StaggerItem key={i.name} className="h-full">
            <div
              onMouseEnter={() => setActive(i.name)}
              onFocus={() => setActive(i.name)}
              tabIndex={0}
              className={cn(
                "flex h-full flex-col rounded-3xl border bg-card p-7 outline-none transition-all duration-400",
                on
                  ? "border-electric shadow-lift"
                  : "border-border shadow-soft hover:border-electric/40",
              )}
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                    on ? "bg-electric text-primary-foreground" : "bg-electric-soft text-electric",
                  )}
                >
                  <i.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold leading-tight">{i.name}</h3>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{i.detail}</p>

              <AnimatePresence initial={false}>
                {on ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-t border-border pt-5">
                      <p className="eyebrow">Recommended AI Employees</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {i.employees.map((e) => (
                          <span
                            key={e}
                            className="rounded-full bg-electric-soft px-3 py-1 text-xs font-medium text-electric"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/ai-employees"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-electric"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
