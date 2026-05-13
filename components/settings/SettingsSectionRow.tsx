import type { ReactNode } from "react";

interface SettingsSectionRowProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export default function SettingsSectionRow({ label, description, children }: SettingsSectionRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[rgb(var(--border))] last:border-0">
      <div>
        <p className="text-[12px] font-medium text-[rgb(var(--foreground))]">{label}</p>
        {description && (
          <p className="text-[11px] text-[rgb(var(--muted-foreground))] mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
