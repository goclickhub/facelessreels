import { ArrowLeft, ArrowRight } from "lucide-react";

interface FooterNavProps {
  step: number;
  total: number;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
}

export function FooterNav({ step, total, onBack, onContinue, continueLabel }: FooterNavProps) {
  const label = continueLabel ?? (step === total ? "Finish" : "Continue");
  return (
    <div className="px-5 md:px-8 py-4 border-t border-[rgb(var(--border))] flex items-center justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--foreground))] bg-[rgb(var(--card))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer"
      >
        <ArrowLeft size={15} />
        Back
      </button>
      <button
        onClick={onContinue}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgb(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
      >
        {label}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
