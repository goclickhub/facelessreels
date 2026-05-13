import { PlusCircle } from "lucide-react";

interface AccountEmptyStateProps {
  onConnect: () => void;
}

export function AccountEmptyState({ onConnect }: AccountEmptyStateProps) {
  return (
    <div className="space-y-3">
      <div className="w-full rounded-xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))] flex items-center justify-center py-16 px-6">
        <button
          onClick={onConnect}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
        >
          Connect your first account
          <PlusCircle size={16} className="text-[rgb(var(--foreground))]" />
        </button>
      </div>
      <p className="text-sm text-[rgb(var(--muted-foreground))] text-center">
        You can connect your social media accounts later
      </p>
    </div>
  );
}
