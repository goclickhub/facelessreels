import { TabSwitch, type TabValue } from "./TabSwitch";
import { PresetGrid } from "./PresetGrid";
import { CustomInput } from "./CustomInput";
import type { SeriesStep } from "@/types";

interface StepSectionProps {
  step: SeriesStep;
  tab: TabValue;
  onTabChange: (tab: TabValue) => void;
  selection: string | null;
  onSelect: (id: string) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
}

export function StepSection({
  step,
  tab,
  onTabChange,
  selection,
  onSelect,
  customText,
  onCustomTextChange,
}: StepSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[22px] font-bold text-[rgb(var(--foreground))]">
          {step.title}
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">
          {step.subtitle}
        </p>
      </div>

      <TabSwitch active={tab} onChange={onTabChange} />

      <div className="bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] p-4">
        {tab === "preset" ? (
          <PresetGrid items={step.data} selected={selection} onSelect={onSelect} />
        ) : (
          <CustomInput
            placeholder={step.placeholder}
            value={customText}
            onChange={onCustomTextChange}
          />
        )}
      </div>
    </div>
  );
}
