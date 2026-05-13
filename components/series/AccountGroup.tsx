"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Platform = "youtube" | "tiktok" | "facebook";

export interface SubAccount {
  id: string;
  label: string;
}

export interface AccountGroupData {
  id: string;
  platform: Platform;
  name: string;
  type: string;
  subAccounts: SubAccount[];
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="w-8 h-8 rounded-md bg-red-600 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M10 15.5l6-3.5-6-3.5v7z" />
        </svg>
      </div>
    );
  }
  if (platform === "tiktok") {
    return (
      <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.78a8.18 8.18 0 004.78 1.52V6.86a4.86 4.86 0 01-1.01-.17z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    </div>
  );
}

function AvatarCircle({ label }: { label: string }) {
  return (
    <div className="w-7 h-7 rounded-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] flex items-center justify-center shrink-0">
      <span className="text-[10px] font-bold text-[rgb(var(--muted-foreground))]">
        {label[0].toUpperCase()}
      </span>
    </div>
  );
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0",
        enabled ? "bg-[rgb(var(--primary))]" : "bg-[rgb(var(--border))]",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
          enabled ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

interface AccountGroupProps {
  group: AccountGroupData;
}

export function AccountGroup({ group }: AccountGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(group.subAccounts.map((a, i) => [a.id, i % 2 === 0])),
  );

  const flipToggle = (id: string) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--card))]">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[rgb(var(--muted))] transition-colors text-left"
      >
        <PlatformIcon platform={group.platform} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{group.name}</p>
          <p className="text-xs text-[rgb(var(--muted-foreground))]">{group.type}</p>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-[rgb(var(--muted-foreground))] transition-transform duration-200 shrink-0",
            expanded && "rotate-180",
          )}
        />
      </button>

      {/* Sub-accounts */}
      {expanded && (
        <div className="border-t border-[rgb(var(--border))]">
          {group.subAccounts.map((account, i) => (
            <div key={account.id}>
              <div className="flex items-center gap-3 px-4 py-3">
                <AvatarCircle label={group.name} />
                <span className="flex-1 text-sm text-[rgb(var(--foreground))]">{account.label}</span>
                <Toggle
                  enabled={toggles[account.id] ?? false}
                  onToggle={() => flipToggle(account.id)}
                />
              </div>
              {i < group.subAccounts.length - 1 && (
                <div className="border-b border-[rgb(var(--border))] mx-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
