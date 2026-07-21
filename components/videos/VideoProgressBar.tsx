export function VideoProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <div className="h-1.5 w-10 shrink-0 rounded-full bg-[rgb(var(--border))] overflow-hidden">
        <div
          className="h-full rounded-full bg-[rgb(var(--primary))] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] font-medium text-[rgb(var(--muted-foreground))] tabular-nums">{progress}%</span>
    </div>
  );
}
