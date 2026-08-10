import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Activity, CheckCircle2, Clock } from "lucide-react";
import { Reveal } from "./primitives";

export const activityData = [
  { day: "Mon", resolved: 320, escalated: 24 },
  { day: "Tue", resolved: 412, escalated: 19 },
  { day: "Wed", resolved: 388, escalated: 27 },
  { day: "Thu", resolved: 501, escalated: 15 },
  { day: "Fri", resolved: 476, escalated: 12 },
  { day: "Sat", resolved: 214, escalated: 6 },
  { day: "Sun", resolved: 188, escalated: 4 },
];

export function ActivityChart({ height = 240 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={activityData} margin={{ left: -18, right: 6, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="sxFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--electric)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--electric)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
              boxShadow: "var(--shadow-soft)",
            }}
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke="var(--electric)"
            strokeWidth={2}
            fill="url(#sxFill)"
          />
          <Area
            type="monotone"
            dataKey="escalated"
            stroke="var(--navy-soft)"
            strokeWidth={1.5}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const tiles = [
  { icon: CheckCircle2, label: "Outcomes resolved", value: "2,499", delta: "+18% wk" },
  { icon: Clock, label: "Median handle time", value: "42 sec", delta: "−31% wk" },
  { icon: Activity, label: "Escalation ratio", value: "4.2%", delta: "−0.8pt wk" },
];

export function DashboardPreview() {
  return (
    <Reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift"
      >
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 text-xs text-muted-foreground">
            syntroxi.com/dashboard — Workforce overview
          </span>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl border border-border p-5">
                <t.icon className="h-4 w-4 text-electric" />
                <p className="mt-4 font-display text-2xl font-semibold text-navy">{t.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
                <p className="mt-3 text-[0.6875rem] font-medium text-electric">{t.delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-border p-5">
            <p className="text-sm font-semibold text-navy">Outcomes this week</p>
            <ActivityChart />
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
