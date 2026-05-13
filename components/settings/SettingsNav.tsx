import type { ComponentType } from "react";
import type { SettingsTab } from "./types";

interface NavItem {
  id: SettingsTab;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

interface SettingsNavProps {
  tabs: NavItem[];
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

export default function SettingsNav({ tabs, active, onChange }: SettingsNavProps) {
  return (
    <div className="flex lg:flex-col gap-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-medium text-left transition-colors cursor-pointer w-full ${
            active === t.id
              ? "bg-[rgb(var(--primary))] text-white"
              : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          <t.icon size={14} className="shrink-0" />
          {t.label}
        </button>
      ))}
    </div>
  );
}
