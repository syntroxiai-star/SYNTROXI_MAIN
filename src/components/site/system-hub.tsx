import { useState } from "react";
import { motion } from "motion/react";
import { systemNodes } from "@/lib/site-data";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Orbital map of the connected business systems around the SYNTROXI core.
 * Nodes and copy are driven entirely by `systemNodes`.
 */
export function SystemHub() {
  const [active, setActive] = useState<string | null>(null);
  const count = systemNodes.length;
  const radius = 38;

  const points = systemNodes.map((node, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    return {
      ...node,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });

  const activeNode = points.find((p) => p.label === active) ?? null;

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-4 py-10 shadow-soft sm:px-8 md:py-16">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />

        <div className="relative mx-auto aspect-square w-full max-w-[680px]">
          {/* connective lines */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {points.map((p, i) => (
              <motion.line
                key={p.label}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="0.18"
                className={cn(
                  "transition-colors duration-500",
                  active === p.label ? "text-electric" : "text-border",
                )}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 * i, ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-full gradient-navy shadow-glow md:h-28 md:w-28"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-4 w-4 rounded-full bg-electric" />
              <motion.span
                className="absolute inset-0 rounded-full border border-electric/50"
                animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>
          </div>

          {/* nodes */}
          {points.map((p, i) => (
            <motion.button
              key={p.label}
              type="button"
              onMouseEnter={() => setActive(p.label)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.label)}
              onBlur={() => setActive(null)}
              className={cn(
                "absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-2xl border bg-card text-center shadow-soft transition-all duration-300 md:h-24 md:w-24",
                active === p.label
                  ? "border-electric text-electric shadow-lift"
                  : "border-border text-navy-soft hover:border-electric/40",
              )}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <p.icon className="h-5 w-5" />
              <span className="text-[0.6875rem] font-medium leading-tight">{p.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="relative mx-auto mt-8 min-h-12 max-w-md text-center">
          <motion.p
            key={activeNode?.label ?? "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {activeNode ? (
              <>
                <span className="font-semibold text-navy">{activeNode.label}</span> —{" "}
                {activeNode.detail}
              </>
            ) : (
              "Hover a system to see what the context graph reads and writes."
            )}
          </motion.p>
        </div>
      </div>
    </Reveal>
  );
}
