"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/media-url";

type AspectRatio = "video" | "square" | "4/3" | "auto";

interface ContentImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: AspectRatio;
  priority?: boolean;
  overlay?: boolean;
}

const aspectClasses: Record<AspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  auto: "min-h-[200px]",
};

export function ContentImage({
  src,
  alt,
  className,
  aspect = "video",
  priority = false,
  overlay = true,
}: ContentImageProps) {
  const [error, setError] = useState(false);
  const imageSrc = resolveMediaUrl(src);

  if (error) {
    return (
      <div
        className={cn(
          aspectClasses[aspect],
          "relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        aspectClasses[aspect],
        "relative overflow-hidden bg-card",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setError(true)}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
