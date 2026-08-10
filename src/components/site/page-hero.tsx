import { motion } from "motion/react";
import type { ReactNode } from "react";
import { NetworkBackground } from "./network-background";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-16 pt-34 md:pb-24 md:pt-40">
      <NetworkBackground className="opacity-70" />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl text-[2.25rem] font-semibold leading-[1.06] md:text-[3.5rem]"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
