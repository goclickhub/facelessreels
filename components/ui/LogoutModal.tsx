"use client";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative z-10 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 w-[320px] shadow-2xl">
        <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))] mb-2">
          Log out?
        </h3>
        <p className="text-[13px] text-[rgb(var(--muted-foreground))] mb-5">
          Are you sure you want to log out of your account?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-[rgb(var(--border))] text-[13px] font-semibold text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer"
          >
            No, cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-xl bg-[rgb(var(--primary))] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
}
