import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { Counter } from "./counter";
import { Reveal } from "./primitives";
import { SxButton } from "./sx-button";

export function RoiCalculator() {
  const [headcount, setHeadcount] = useState(8);
  const [salary, setSalary] = useState(52);
  const [automation, setAutomation] = useState(55);

  const result = useMemo(() => {
    const humanCost = headcount * salary * 1000;
    const saved = humanCost * (automation / 100);
    const platform = Math.max(1490, headcount * 620 * 12 * 0.28);
    const net = Math.max(0, saved - platform);
    const roi = platform > 0 ? (net / platform) * 100 : 0;
    const hours = headcount * 1800 * (automation / 100);
    return { saved, platform, net, roi, hours };
  }, [headcount, salary, automation]);

  return (
    <Reveal>
      <div className="grid gap-10 rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10 lg:grid-cols-2">
        <div className="space-y-9">
          <Field
            label="Roles in scope"
            value={`${headcount} people`}
            onChange={(v) => setHeadcount(v)}
            val={headcount}
            min={1}
            max={60}
          />
          <Field
            label="Average fully-loaded salary"
            value={`$${salary}k / year`}
            onChange={(v) => setSalary(v)}
            val={salary}
            min={25}
            max={180}
          />
          <Field
            label="Work an AI Employee can own"
            value={`${automation}%`}
            onChange={(v) => setAutomation(v)}
            val={automation}
            min={10}
            max={90}
          />
        </div>

        <div className="flex flex-col justify-between rounded-2xl gradient-navy p-7 text-white md:p-8">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Projected annual impact
            </p>
            <motion.p
              key={result.net}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl"
            >
              <Counter to={Math.round(result.net)} prefix="$" />
            </motion.p>
            <p className="mt-2 text-sm text-white/70">Net saving after platform investment</p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-5 border-t border-white/15 pt-6">
            <Stat label="Hours returned" value={<Counter to={Math.round(result.hours)} />} />
            <Stat label="ROI" value={<Counter to={Math.round(result.roi)} suffix="%" />} />
            <Stat
              label="Gross saving"
              value={<Counter to={Math.round(result.saved)} prefix="$" />}
            />
            <Stat
              label="Platform cost"
              value={<Counter to={Math.round(result.platform)} prefix="$" />}
            />
          </dl>

          <SxButton to="/contact" variant="light" size="md" className="mt-8 w-full">
            Get a modelled business case
          </SxButton>
        </div>
      </div>
    </Reveal>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dd className="text-lg font-semibold">{value}</dd>
      <dt className="mt-0.5 text-xs text-white/60">{label}</dt>
    </div>
  );
}

function Field({
  label,
  value,
  val,
  min,
  max,
  onChange,
}: {
  label: string;
  value: string;
  val: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-navy">{label}</label>
        <span className="text-sm font-semibold text-electric">{value}</span>
      </div>
      <Slider
        className="mt-4"
        value={[val]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}
