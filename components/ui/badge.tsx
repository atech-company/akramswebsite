import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          default: "bg-primary/15 text-primary border border-primary/20",
          secondary: "bg-white/5 text-muted border border-white/10",
          outline: "border border-white/15 text-foreground",
          accent: "bg-accent/15 text-accent border border-accent/20",
        }[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
