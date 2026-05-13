import { ChevronRight } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface GuideStepListProps {
  steps: Step[];
}

export default function GuideStepList({ steps }: GuideStepListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
        Step-by-step setup
      </h2>
      <div className="space-y-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex gap-4 rounded-xl p-4 bg-[rgb(var(--card))] border border-[rgb(var(--border))]"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary))] text-white text-[11px] font-bold">
              {step.id}
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
                {step.title}
              </p>
              <p className="text-[12px] leading-relaxed text-[rgb(var(--muted-foreground))]">
                {step.description}
              </p>
            </div>
            <ChevronRight
              size={14}
              className="ml-auto shrink-0 self-center text-[rgb(var(--muted-foreground))]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
