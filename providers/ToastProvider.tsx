"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error";

interface Toast {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
}

interface ToastCtx {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((kind: ToastKind, title: string, description?: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, kind, title, description }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const ctx: ToastCtx = {
    success: (title, desc) => push("success", title, desc),
    error: (title, desc) => push("error", title, desc),
  };

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "toast-animate pointer-events-auto flex items-start gap-3",
              "rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]",
              "px-4 py-3 shadow-xl min-w-72 max-w-sm",
            )}
          >
            {t.kind === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-xs text-[rgb(var(--muted-foreground))]">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              className="shrink-0 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
