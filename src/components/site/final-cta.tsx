import { Reveal } from "./primitives";
import { SxButton } from "./sx-button";
import { NetworkBackground } from "./network-background";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="final-cta-title">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] gradient-navy px-8 py-16 text-center md:px-16 md:py-24">
            <NetworkBackground className="opacity-25 mix-blend-screen" />
            <div className="relative">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                Start with one role
              </p>
              <h2
                id="final-cta-title"
                className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-[1.1] text-white md:text-5xl"
              >
                Hire your first AI Employee this quarter.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
                We map your systems, deploy one employee in two weeks and expand only when the
                numbers justify it.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <SxButton to="/contact" variant="light" size="lg">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </SxButton>
                <SxButton
                  to="/pricing"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  See pricing
                </SxButton>
              </div>

              <div className="mx-auto mt-10 max-w-4xl">
                <p className="mb-4 text-sm font-medium text-white/75">
                  Recognized for building AI-first systems that help teams move faster.
                </p>
                <div className="rounded-[1.5rem] border border-white/15 bg-white/8 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                  <div className="rounded-[1rem] border border-white/10 bg-white/5 p-2">
                    <img
                      src="/certificate.jpeg"
                      alt="DPIIT certificate recognizing SYNTROXI as a startup in India"
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto h-auto max-h-[420px] w-full rounded-[0.85rem] object-contain bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
