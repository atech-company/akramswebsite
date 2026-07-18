import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/**
 * Serve a size close to display (128px WebP ≈ 2KB) for sharp retina at ~72px.
 */
export function BrandLogo({ className, size = 72, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo-128.webp"
      alt="AkramsLab — مختبر اكرم"
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn("rounded-2xl object-contain bg-black", className)}
    />
  );
}
