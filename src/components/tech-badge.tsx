import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm",
        "bg-accent/20 px-3 py-1",
        "text-accent-foreground text-xs font-medium",
        "hover:bg-accent/30 transition-colors",
        className
      )}
    >
      {name}
    </span>
  );
}
