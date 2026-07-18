import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/**
 * Retina-ready brand mark (512px WebP ≈ 11KB).
 * Displays sharp on phones, tablets, and HiDPI screens.
 */
export function BrandLogo({ className, size = 48, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo-512.webp"
      alt="AkramsLab — مختبر اكرم"
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={cn("rounded-2xl object-contain bg-black", className)}
    />
  );
}
