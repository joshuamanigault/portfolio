import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        "bg-accent/20 px-3 py-1",
        "text-xs font-medium text-accent-foreground",
        "transition-colors hover:bg-accent/30",
        className
      )}
    >
      {name}
    </span>
  );
}
