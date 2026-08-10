import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center" role="status" aria-live="polite">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0b1020" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "SYNTROXI" },
      { title: "SYNTROXI — AI Business Operating System | AI Employees & Automation" },
      {
        name: "description",
        content:
          "SYNTROXI is an AI Business Operating System for AI Employees, workflow automation, AI automation, and connected business systems that help SMEs and enterprises grow faster.",
      },
      { property: "og:site_name", content: "SYNTROXI" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "SYNTROXI — AI Business Operating System | AI Employees & Automation",
      },
      {
        property: "og:description",
        content:
          "Deploy AI Employees, automate workflows, and run a connected operating model with the SYNTROXI AI Business Operating System.",
      },
      { property: "og:image", content: "https://syntroxi.com/og-image.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://syntroxi.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@syntroxi" },
      { name: "twitter:image", content: "https://syntroxi.com/og-image.png" },
      {
        name: "twitter:title",
        content: "SYNTROXI — AI Business Operating System | AI Employees & Automation",
      },
      {
        name: "twitter:description",
        content:
          "Deploy AI Employees, automate workflows, and run a connected operating model with SYNTROXI.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "canonical", href: "https://syntroxi.com/" },
      { rel: "preload", href: "/logo.svg", as: "image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SYNTROXI",
          url: "https://syntroxi.com",
          logo: "https://syntroxi.com/logo.svg",
          description:
            "SYNTROXI is an AI Business Operating System that helps companies deploy AI Employees, automation, and connected business workflows.",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "business@syntroxi.com",
            telephone: "+91 9024892308",
          },
          areaServed: "Worldwide",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SYNTROXI",
          url: "https://syntroxi.com",
          description:
            "AI Employees, AI automation, workflow automation, and connected business systems for SMEs and enterprises.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://syntroxi.com/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SYNTROXI",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "An AI Business Operating System for deploying AI Employees, automating workflows, and connecting operations across the business.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useSmoothScroll(pathname);
  const bare = pathname.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      {bare ? null : <Navbar />}
      <main className={bare ? "" : "min-h-screen"}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      {bare ? null : <Footer />}
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
