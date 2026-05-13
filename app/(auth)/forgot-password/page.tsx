"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

const inputCls =
  "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { success: toastSuccess } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toastSuccess("Reset link sent!", "Check your inbox — it expires in 15 minutes.");
    }, 2000);
  };

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgb(var(--primary) / 0.12)" }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: "rgb(var(--primary))" }} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">Check your email</h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            We sent a password reset link to your email. It expires in 15 minutes.
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 text-left text-sm">
          <p className="text-[rgb(var(--muted-foreground))]">
            Didn&apos;t receive it? Check your spam folder, or
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-1 text-[rgb(var(--primary))] hover:underline"
          >
            try a different email address
          </button>
        </div>

        <Link
          href="/sign-in"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] py-2.5 text-sm font-medium text-[rgb(var(--foreground))] transition hover:bg-[rgb(var(--muted))]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/sign-in"
        className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
      </Link>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--foreground))]">
          Forgot password?
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Sending link..." : "Send reset link"}
        </button>
      </form>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Remember your password?{" "}
        <Link href="/sign-in" className="font-medium text-[rgb(var(--primary))] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
