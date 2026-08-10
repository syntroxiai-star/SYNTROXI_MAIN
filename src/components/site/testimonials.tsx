import { testimonials, logos } from "@/lib/site-data";
import { Reveal, Stagger, StaggerItem } from "./primitives";

export function Testimonials() {
  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <StaggerItem key={t.name}>
          <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
            <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-navy">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-7 border-t border-border pt-5">
              <p className="text-sm font-semibold text-navy">{t.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function LogoRow() {
  return (
    <Reveal>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((l) => (
          <span
            key={l}
            className="font-display text-lg font-semibold tracking-tight text-navy/35 transition-colors hover:text-navy/70"
          >
            {l}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
