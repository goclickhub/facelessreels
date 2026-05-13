import { Trash2 } from "lucide-react";

export default function DangerZoneTab() {
  return (
    <div className="space-y-4">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
        Danger Zone
      </p>
      <p className="text-[12px] text-[rgb(var(--muted-foreground))]">
        Actions below are irreversible. Please proceed with caution.
      </p>

      <div className="space-y-3">
        <div className="rounded-xl border border-red-200 dark:border-red-900/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold text-[rgb(var(--foreground))]">
              Delete all videos
            </p>
            <p className="text-[11px] text-[rgb(var(--muted-foreground))] mt-0.5">
              Permanently delete all generated videos from your account.
            </p>
          </div>
          <button className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition-colors cursor-pointer dark:bg-red-950/40 dark:text-red-400 shrink-0">
            <Trash2 size={12} /> Delete videos
          </button>
        </div>

        <div className="rounded-xl border border-red-200 dark:border-red-900/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold text-[rgb(var(--foreground))]">
              Delete account
            </p>
            <p className="text-[11px] text-[rgb(var(--muted-foreground))] mt-0.5">
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
          </div>
          <button className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 transition-colors cursor-pointer shrink-0">
            <Trash2 size={12} /> Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
