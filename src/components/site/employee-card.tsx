import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Employee } from "@/lib/site-data";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const Icon = employee.icon;
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        to="/ai-employees/$slug"
        params={{ slug: employee.slug }}
        className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow duration-500 hover:border-electric/40 hover:shadow-lift"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-soft">
            <Icon className="h-5 w-5 text-electric" />
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {employee.category}
          </span>
        </div>

        <h3 className="mt-7 text-xl font-semibold">{employee.name}</h3>
        <p className="mt-1 text-sm font-medium text-electric">{employee.role}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {employee.summary}
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-5">
          {employee.metrics.map((m) => (
            <div key={m.label}>
              <dd className="text-sm font-semibold text-navy">{m.value}</dd>
              <dt className="mt-0.5 text-[0.6875rem] leading-tight text-muted-foreground">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            from <span className="font-semibold text-navy">${employee.price}</span>/mo
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-navy transition-colors group-hover:bg-electric group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
