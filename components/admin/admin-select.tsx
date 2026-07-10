"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | { value: string; label: string }[];
  className?: string;
  size?: "sm" | "md";
  dropUp?: boolean;
}

export function AdminSelect({ value, onChange, options, className, size = "md", dropUp }: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );

  const current = normalized.find((o) => o.value === value)?.label ?? value;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "admin-select w-full flex items-center justify-between gap-2 capitalize",
          size === "sm" ? "px-3 py-1.5 text-xs" : "px-3 py-2.5 text-sm",
          open && "ring-2 ring-primary/50 border-primary/30"
        )}
      >
        <span>{current}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 rounded-xl border border-white/12 bg-[#18181b] shadow-2xl overflow-hidden py-1",
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          )}
        >
          {normalized.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm capitalize text-left transition-colors",
                o.value === value
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-white/8"
              )}
            >
              {o.label}
              {o.value === value && <Check className="h-4 w-4 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
