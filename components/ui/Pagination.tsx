import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  /** Extra condition beyond page >= totalPages — e.g. don't advance past a
   * page whose data hasn't loaded yet (isPlaceholderData). */
  nextDisabled?: boolean;
  label: React.ReactNode;
}

export function Pagination({ page, totalPages, onPrev, onNext, nextDisabled, label }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[12px] text-[rgb(var(--muted-foreground))]">{label}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="flex items-center gap-1 h-8 px-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[12px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages || nextDisabled}
          className="flex items-center gap-1 h-8 px-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[12px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
