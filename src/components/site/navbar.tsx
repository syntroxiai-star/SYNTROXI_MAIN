import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { SxButton } from "./sx-button";
import { cn } from "@/lib/utils";

const links = [
  { label: "AI Employees", to: "/ai-employees" },
  { label: "Connected Systems", to: "/connected-systems" },
  { label: "Workforce Builder", to: "/workforce-builder" },
  { label: "Industries", to: "/industries" },
  { label: "Pricing", to: "/pricing" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Resources", to: "/resources" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-[1200px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center" aria-label="SYNTROXI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-3 py-2 text-[0.8125rem] font-medium text-navy-soft transition-colors hover:text-electric",
                pathname.startsWith(l.to) && "text-electric",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SxButton to="/auth" variant="ghost" size="sm">
            Sign in
          </SxButton>
          <SxButton to="/contact" size="sm">
            Book a demo
          </SxButton>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="hairline flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-navy hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex gap-2">
                <SxButton to="/auth" variant="outline" size="sm" className="flex-1">
                  Sign in
                </SxButton>
                <SxButton to="/contact" size="sm" className="flex-1">
                  Book a demo
                </SxButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
