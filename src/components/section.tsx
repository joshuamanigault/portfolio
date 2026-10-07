import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ children, className, fullHeight = false }: SectionProps) {
  return (
    <section
      className={cn(
        "container-main py-16 md:py-24",
        fullHeight && "flex min-h-[100dvh] items-center",
        className
      )}
    >
      {children}
    </section>
  );
}
