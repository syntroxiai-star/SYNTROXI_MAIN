import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { NetworkBackground } from "./network-background";
import { SxButton } from "./sx-button";
import { Counter } from "./counter";

const words = ["Hire", "AI", "Employees", "that", "run", "your", "business."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      <NetworkBackground />
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-[1200px] px-6 text-center md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-navy-soft backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
          The AI workforce platform for serious operators
        </motion.p>

        <h1 className="mx-auto mt-8 max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[4.25rem]">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={
                w === "AI" || w === "Employees"
                  ? "mr-[0.28em] inline-block text-electric"
                  : "mr-[0.28em] inline-block"
              }
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          SYNTROXI deploys autonomous digital employees onto a connected system of your CRM, ERP,
          warehouse and inbox — so work gets finished, not just answered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <SxButton to="/ai-employees" size="lg">
            Explore AI Employees <ArrowRight className="h-4 w-4" />
          </SxButton>
          <SxButton to="/contact" variant="outline" size="lg">
            Book a demo
          </SxButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4"
        >
          {[
            { v: <Counter to={3} />, l: "Completed prototypes" },
            { v: <Counter to={2} />, l: "Sales & marketing roles" },
            { v: <Counter to={6} suffix="+" />, l: "Planned AI functions" },
            { v: <Counter to={1} />, l: "Connected operating model" },
          ].map((s, i) => (
            <div key={i}>
              <dd className="font-display text-2xl font-semibold text-navy md:text-3xl">{s.v}</dd>
              <dt className="mt-1.5 text-xs text-muted-foreground">{s.l}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
