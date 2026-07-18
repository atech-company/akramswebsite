import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: {
    en: "text-base",
    ar: "text-sm",
  },
  md: {
    en: "text-xl",
    ar: "text-base",
  },
  lg: {
    en: "text-2xl",
    ar: "text-lg",
  },
};

export function BrandWordmark({ className, size = "md" }: BrandWordmarkProps) {
  const s = sizeClasses[size];

  return (
    <span className={cn("flex items-baseline gap-2.5 flex-wrap", className)}>
      <span className={cn("font-bold tracking-tight", s.en)}>
        Akrams<span className="text-primary">Lab</span>
      </span>
      <span
        lang="ar"
        dir="rtl"
        className={cn(
          "font-[family-name:var(--font-arabic)] font-semibold text-muted",
          s.ar
        )}
      >
        مختبر اكرم
      </span>
    </span>
  );
}
