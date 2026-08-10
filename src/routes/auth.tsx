import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Logo } from "@/components/site/logo";
import { SxButton } from "@/components/site/sx-button";
import { NetworkBackground } from "@/components/site/network-background";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({
    meta: [
      { title: "Sign in — SYNTROXI" },
      {
        name: "description",
        content: "Sign in or create a SYNTROXI account to manage your AI workforce.",
      },
      { property: "og:title", content: "Sign in — SYNTROXI" },
      { property: "og:description", content: "Access the SYNTROXI client portal." },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:url", content: "https://syntroxi.com/auth" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://syntroxi.com/auth" }],
  }),
});

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <NetworkBackground />
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lift"
      >
        <Link to="/" className="flex justify-center">
          <Logo />
        </Link>

        <div className="mt-8 flex rounded-full bg-secondary p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-full py-2 text-sm font-medium transition-colors",
                mode === m ? "bg-navy text-primary-foreground" : "text-navy-soft",
              )}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form
          className="mt-7 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Authentication is mocked in this preview build.");
          }}
        >
          {mode === "signup" ? (
            <div>
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" className="mt-2" placeholder="Alex Mercer" required />
            </div>
          ) : null}
          <div>
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              className="mt-2"
              placeholder="alex@company.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="mt-2" placeholder="••••••••" required />
          </div>
          <SxButton type="submit" className="w-full" size="lg">
            {mode === "signin" ? "Sign in" : "Create account"}
          </SxButton>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prefer a guided tour?{" "}
          <Link to="/contact" className="font-medium text-electric">
            Book a demo
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
