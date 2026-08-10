import { motion } from "motion/react";
import { Database, Workflow, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "./primitives";

const ring = [
  { label: "CRM", angle: -90 },
  { label: "ERP", angle: -30 },
  { label: "Warehouse", angle: 30 },
  { label: "Support", angle: 90 },
  { label: "Docs", angle: 150 },
  { label: "Billing", angle: 210 },
];

const layers = [
  { icon: Database, title: "Context graph", detail: "Governed, deduplicated, always current." },
  { icon: Workflow, title: "Action layer", detail: "Write-back with approvals and rollbacks." },
  { icon: ShieldCheck, title: "Control plane", detail: "Permissions, audit and replay." },
  { icon: Users, title: "Human handoff", detail: "Escalations arrive fully briefed." },
];

export function SystemsVisual() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
      <Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-[14%] rounded-full border border-border" />
          <div className="absolute inset-[28%] rounded-full border border-dashed border-electric/30" />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {ring.map((r) => {
              const rad = (r.angle * Math.PI) / 180;
              const x = 50 + 46 * Math.cos(rad);
              const y = 50 + 46 * Math.sin(rad);
              return (
                <motion.div
                  key={r.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <span className="whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-navy shadow-soft">
                    {r.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full gradient-navy text-center shadow-glow">
            <span className="text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
              Syntroxi
            </span>
            <span className="mt-1 text-sm font-semibold text-white">Context Graph</span>
          </div>

          <motion.div
            className="absolute inset-[28%] rounded-full border border-electric/50"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </Reveal>

      <div className="space-y-3">
        {layers.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.08}>
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-soft">
                <l.icon className="h-4.5 w-4.5 text-electric" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{l.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
