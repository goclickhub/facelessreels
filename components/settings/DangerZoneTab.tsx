"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import PasswordInput from "@/components/shared/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api";

function DeleteAccountModal({ onCancel }: { onCancel: () => void }) {
  const router = useRouter();
  const { deleteAccountMutation } = useAuth();
  const { error: toastError } = useToast();
  const [password, setPassword] = useState("");

  const handleConfirm = async () => {
    if (!password) {
      toastError("Password required", "Enter your password to confirm account deletion.");
      return;
    }
    try {
      await deleteAccountMutation.mutateAsync({ password });
      router.push("/sign-in");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't delete account", message);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 w-[340px] shadow-2xl space-y-4">
        <div>
          <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))] mb-1">Delete account?</h3>
          <p className="text-[13px] text-[rgb(var(--muted-foreground))]">
            This permanently deletes your account and all associated data. This cannot be undone.
          </p>
        </div>
        <PasswordInput
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-[rgb(var(--border))] text-[13px] font-semibold text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleteAccountMutation.isPending}
            className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white text-[13px] font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {deleteAccountMutation.isPending && <Loader2 size={13} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DangerZoneTab() {
  const { success: toastSuccess } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

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
          <button
            onClick={() => toastSuccess("Coming soon", "Bulk video deletion isn't available yet.")}
            className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition-colors cursor-pointer dark:bg-red-950/40 dark:text-red-400 shrink-0"
          >
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
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-1.5 h-8 px-4 rounded-lg bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 size={12} /> Delete account
          </button>
        </div>
      </div>

      {confirmOpen && <DeleteAccountModal onCancel={() => setConfirmOpen(false)} />}
    </div>
  );
}
