import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export function BrandLogo({ className, size = 40, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo.png"
      alt="AkramsLab"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-2xl object-cover", className)}
    />
  );
}
