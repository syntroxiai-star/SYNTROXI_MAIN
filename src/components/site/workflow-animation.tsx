import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "./primitives";

const steps = [
  { title: "Signal received", detail: "New enterprise trial signs up at 02:14." },
  { title: "Context assembled", detail: "Firmographics, product usage and past touches unified." },
  { title: "Work executed", detail: "Personalised outreach sent, CRM updated, task created." },
  { title: "Outcome logged", detail: "Meeting booked for 10:30. AE briefed automatically." },
];

export function WorkflowAnimation() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % (steps.length + 1)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <Reveal>
      <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {steps.map((s, i) => {
            const done = i < active;
            const current = i === active;
            return (
              <div key={s.title} className="relative flex-1">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      backgroundColor: done || current ? "var(--electric)" : "var(--secondary)",
                      scale: current ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  >
                    {done ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <span
                        className={
                          current
                            ? "text-xs font-semibold text-white"
                            : "text-xs font-semibold text-muted-foreground"
                        }
                      >
                        {i + 1}
                      </span>
                    )}
                  </motion.div>
                  {i < steps.length - 1 ? (
                    <div className="hidden h-px flex-1 bg-border md:block">
                      <motion.div
                        className="h-px bg-electric"
                        animate={{ width: done ? "100%" : "0%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </div>
                  ) : null}
                </div>
                <motion.div animate={{ opacity: done || current ? 1 : 0.5 }} className="mt-4">
                  <p className="text-sm font-semibold text-navy">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
