"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  id: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
}

interface InlineSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (id: string) => void;
}

export function InlineSelect({ options, value, onChange }: InlineSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value) ?? options[0];

  return (
    <div className="border border-[rgb(var(--border))] rounded-xl overflow-hidden">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[rgb(var(--card))] hover:bg-[rgb(var(--muted))] transition-colors text-left"
      >
        <div className="shrink-0">{selected.icon}</div>
        <span className="flex-1 text-sm font-medium text-[rgb(var(--foreground))]">
          {selected.label}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-[rgb(var(--muted-foreground))] transition-transform duration-200 shrink-0",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Expanded list */}
      {open && (
        <div className="border-t border-[rgb(var(--border))] max-h-52 overflow-y-auto">
          {options.map((option, i) => (
            <div key={option.id}>
              <button
                onClick={() => { onChange(option.id); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                  option.id === value
                    ? "bg-[rgb(var(--secondary))]"
                    : "hover:bg-[rgb(var(--muted))]",
                )}
              >
                <div className="shrink-0">{option.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[rgb(var(--foreground))]">{option.label}</p>
                  {option.sublabel && (
                    <p className="text-xs text-[rgb(var(--muted-foreground))]">{option.sublabel}</p>
                  )}
                </div>
              </button>
              {i < options.length - 1 && (
                <div className="border-b border-[rgb(var(--border))] mx-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
