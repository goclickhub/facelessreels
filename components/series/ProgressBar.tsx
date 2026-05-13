interface ProgressBarProps {
  step: number;
  total: number;
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const progress = (step / total) * 100;

  return (
    <div className="px-5 md:px-8 pt-5 pb-1">
      <div className="w-full h-2 rounded-full bg-[rgb(var(--border))]">
        <div
          className="h-full rounded-full bg-[rgb(var(--primary))] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-[rgb(var(--muted-foreground))]">
        Step {step} of {total}
      </p>
    </div>
  );
}
