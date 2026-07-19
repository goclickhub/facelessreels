import type { ReactNode } from "react";
import { FileText, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabValue = "preset" | "custom";

export interface TabConfig {
  value: TabValue;
  label: string;
  icon: ReactNode;
}

const DEFAULT_TABS: [TabConfig, TabConfig] = [
  { value: "preset", label: "Preset", icon: <FileText size={14} /> },
  { value: "custom", label: "Custom", icon: <Link2 size={14} /> },
];

interface TabSwitchProps {
  active: TabValue;
  onChange: (tab: TabValue) => void;
  tabs?: [TabConfig, TabConfig];
}

export function TabSwitch({ active, onChange, tabs = DEFAULT_TABS }: TabSwitchProps) {
  return (
    <div className="flex border-b border-[rgb(var(--border))]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex items-center gap-1.5 py-2 pr-6 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer",
            active === tab.value
              ? "border-[rgb(var(--primary))] text-[rgb(var(--primary))]"
              : "border-transparent text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
