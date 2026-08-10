import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Check, CreditCard, Cpu, Network, Users } from "lucide-react";
import { companySizes, departments, employees, systemNodes } from "@/lib/site-data";
import { SxButton } from "./sx-button";
import { Reveal } from "./primitives";
import { cn } from "@/lib/utils";

const steps = [
  { id: "size", label: "Company Size", icon: Building2 },
  { id: "departments", label: "Departments", icon: Users },
  { id: "employees", label: "AI Employees", icon: Cpu },
  { id: "systems", label: "Systems", icon: Network },
  { id: "checkout", label: "Checkout", icon: CreditCard },
];

export function TeamBuilderWizard() {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState(companySizes[0].id);
  const [depts, setDepts] = useState<string[]>(["Support", "Revenue"]);
  const [picked, setPicked] = useState<string[]>(["aria-support", "vero-sdr"]);
  const [systems, setSystems] = useState<string[]>(["CRM", "Finance"]);

  const sizeMeta = companySizes.find((s) => s.id === size)!;
  const available = employees.filter((e) => depts.length === 0 || depts.includes(e.category));
  const team = employees.filter((e) => picked.includes(e.slug));

  const monthly = useMemo(
    () =>
      Math.round(
        team.reduce((sum, e) => sum + e.price, 0) * sizeMeta.multiplier + systems.length * 120,
      ),
    [team, sizeMeta, systems],
  );

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const canContinue =
    (step === 0 && !!size) ||
    (step === 1 && depts.length > 0) ||
    (step === 2 && picked.length > 0) ||
    step === 3;

  return (
    <Reveal>
      <div className="rounded-[2rem] border border-border bg-card px-5 py-10 shadow-soft md:px-10 md:py-14">
        {/* stepper */}
        <div className="flex items-start justify-center gap-1 overflow-x-auto pb-2 sm:gap-2">
          {steps.map((s, i) => {
            const state = i === step ? "current" : i < step ? "done" : "todo";
            return (
              <div key={s.id} className="flex items-start">
                <button
                  type="button"
                  onClick={() => i <= step && setStep(i)}
                  className="flex w-20 shrink-0 flex-col items-center gap-2.5 text-center sm:w-24"
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300",
                      state === "current"
                        ? "border-electric bg-electric-soft text-electric"
                        : state === "done"
                          ? "border-electric/40 bg-card text-electric"
                          : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {state === "done" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-[0.6875rem] font-medium leading-tight transition-colors",
                      state === "todo" ? "text-muted-foreground" : "text-navy",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 ? (
                  <div className="mt-5 h-px w-6 shrink-0 bg-border sm:w-12">
                    <motion.div
                      className="h-px bg-electric"
                      animate={{ width: i < step ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* panels */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {companySizes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSize(c.id)}
                      className={cn(
                        "rounded-2xl border px-6 py-7 text-center transition-all duration-300",
                        size === c.id
                          ? "border-electric bg-electric-soft/50 shadow-lift"
                          : "border-border hover:-translate-y-0.5 hover:border-electric/40",
                      )}
                    >
                      <p className="text-base font-semibold text-navy">{c.name}</p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{c.detail}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.map((d) => {
                    const on = depts.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        onClick={() => toggle(depts, setDepts, d.id)}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                          on
                            ? "border-electric bg-electric-soft/50"
                            : "border-border hover:-translate-y-0.5 hover:border-electric/40",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            on ? "bg-electric text-primary-foreground" : "bg-secondary text-navy",
                          )}
                        >
                          <d.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-navy">{d.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {available.map((e) => {
                    const on = picked.includes(e.slug);
                    return (
                      <button
                        key={e.slug}
                        onClick={() => toggle(picked, setPicked, e.slug)}
                        className={cn(
                          "flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-300",
                          on
                            ? "border-electric bg-electric-soft/50"
                            : "border-border hover:-translate-y-0.5 hover:border-electric/40",
                        )}
                      >
                        <span className="flex items-center justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-navy">
                            <e.icon className="h-4 w-4" />
                          </span>
                          {on ? <Check className="h-4 w-4 text-electric" /> : null}
                        </span>
                        <span className="mt-4 text-sm font-semibold text-navy">
                          {e.name} · {e.role}
                        </span>
                        <span className="mt-2 text-xs text-muted-foreground">
                          ${e.price.toLocaleString()} / month base
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {systemNodes.map((s) => {
                    const on = systems.includes(s.label);
                    return (
                      <button
                        key={s.label}
                        onClick={() => toggle(systems, setSystems, s.label)}
                        className={cn(
                          "flex flex-col items-center gap-3 rounded-2xl border px-4 py-6 transition-all duration-300",
                          on
                            ? "border-electric bg-electric-soft/50 text-electric"
                            : "border-border text-navy-soft hover:-translate-y-0.5 hover:border-electric/40",
                        )}
                      >
                        <s.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {step === 4 ? (
                <div className="mx-auto max-w-xl rounded-2xl border border-border bg-secondary/40 p-7">
                  <p className="eyebrow">Your plan</p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Company size</dt>
                      <dd className="font-medium text-navy">{sizeMeta.name}</dd>
                    </div>
                    <div className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">Departments</dt>
                      <dd className="text-right font-medium text-navy">
                        {depts.length ? depts.join(", ") : "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">AI Employees</dt>
                      <dd className="text-right font-medium text-navy">
                        {team.length ? team.map((t) => t.name).join(", ") : "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">Systems</dt>
                      <dd className="text-right font-medium text-navy">
                        {systems.length ? systems.join(", ") : "—"}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                    <span className="text-sm text-muted-foreground">Estimated monthly</span>
                    <span className="text-3xl font-semibold text-navy">
                      ${monthly.toLocaleString()}
                    </span>
                  </div>
                  <SxButton to="/checkout" className="mt-6 w-full justify-center">
                    Coming soon
                  </SxButton>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy disabled:opacity-40"
          >
            Back
          </button>
          <p className="text-xs text-muted-foreground">
            Step {step + 1} of {steps.length}
          </p>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => canContinue && setStep((s) => s + 1)}
              disabled={!canContinue}
              className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <span className="w-16" />
          )}
        </div>
      </div>
    </Reveal>
  );
}
