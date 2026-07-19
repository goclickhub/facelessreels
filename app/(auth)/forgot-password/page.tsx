"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";

const inputCls =
  "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { forgotPasswordMutation } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  const router = useRouter();
  const loading = forgotPasswordMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordMutation.mutateAsync({ email });
      toastSuccess("Code sent!", "Check your inbox for a 6-digit reset code.");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't send code", message);
    }
  };

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
          Enter your email and we&apos;ll send you a reset code.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Sending code..." : "Send reset code"}
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
