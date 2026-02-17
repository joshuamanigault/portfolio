import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "container-main py-16 md:py-24",
        fullHeight && "flex min-h-screen items-center",
        className
      )}
    >
      {children}
    </section>
  );
}
