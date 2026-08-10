import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { ArrowUpRight } from "lucide-react";

const groups = [
  {
    title: "Platform",
    items: [
      { label: "AI Employees", to: "/ai-employees" },
      { label: "Connected Systems", to: "/connected-systems" },
      { label: "Workforce Builder", to: "/workforce-builder" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Industries", to: "/industries" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", to: "/resources" },
      { label: "Pricing", to: "/pricing" },
      { label: "Checkout", to: "/checkout" },
      { label: "Sign in", to: "/auth" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI Employees and Connected Business Systems for companies that intend to operate at a
              different speed.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-electric"
            >
              Talk to our team <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
                {g.title}
              </p>
              <ul className="mt-5 space-y-3">
                {g.items.map((i) => (
                  <li key={i.to}>
                    <Link
                      to={i.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-electric"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SYNTROXI. All rights reserved.</p>
          <p>Designed for secure, auditable operations.</p>
        </div>
      </div>
    </footer>
  );
}
