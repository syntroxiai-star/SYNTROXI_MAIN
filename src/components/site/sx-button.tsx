import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--navy)_88%,var(--electric))]",
  outline:
    "hairline bg-background text-navy hover:border-electric hover:text-electric hover:-translate-y-0.5",
  ghost: "text-navy hover:bg-secondary",
  light:
    "bg-electric-soft text-electric hover:bg-[color-mix(in_oklab,var(--electric-soft)_70%,var(--electric)_12%)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.95rem]",
};

export function SxButton({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <motion.span whileTap={{ scale: 0.98 }} className="inline-flex">
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.span>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <motion.button whileTap={{ scale: 0.98 }} type={type} onClick={onClick} className={classes}>
      {children}
    </motion.button>
  );
}
