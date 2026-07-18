"use client";

import { Loader2 } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 w-[320px] shadow-2xl">
        <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))] mb-2">
          {title}
        </h3>
        <p className="text-[13px] text-[rgb(var(--muted-foreground))] mb-5">
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 h-10 rounded-xl border border-[rgb(var(--border))] text-[13px] font-semibold text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 h-10 rounded-xl text-white text-[13px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-1.5 ${
              danger ? "bg-red-600" : "bg-[rgb(var(--primary))]"
            }`}
          >
            {loading && <Loader2 size={13} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
