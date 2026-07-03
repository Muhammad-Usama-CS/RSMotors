import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-red text-white font-display font-bold text-lg shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
        RS
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-bold text-lg tracking-tight", dark && "text-white")}>
          RS Motors
        </span>
        <span className={cn("text-[10px] uppercase tracking-[0.2em] text-muted-foreground", dark && "text-white/60")}>
          Premium Auto
        </span>
      </span>
    </Link>
  );
}
