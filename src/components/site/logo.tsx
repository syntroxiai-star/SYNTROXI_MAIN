import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="SYNTROXI"
      width={240}
      height={80}
      loading="eager"
      decoding="async"
      className={cn("h-24 w-auto max-w-[1400px] object-contain sm:h-28", className)}
    />
  );
}
