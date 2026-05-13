"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import PasswordInput from "@/components/shared/PasswordInput";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { success: toastSuccess } = useToast();

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(next);
    setError("");
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return setError("Please enter all 6 digits.");
    if (newPassword.length < 8) return setError("Password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toastSuccess("Password reset!", "You can now sign in with your new password.");
    }, 2000);
  };

  const otpInputCls =
    "h-11 w-11 rounded-lg border-2 border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-center text-lg font-semibold text-[rgb(var(--foreground))] outline-none transition focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]/20";

  if (done) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">Password reset!</h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Your password has been updated. You can now sign in.
          </p>
        </div>
        <Link
          href="/sign-in"
          className="flex w-full items-center justify-center rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/forgot-password"
        className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--foreground))]">
          Reset password
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Enter the 6-digit code from your email and choose a new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[rgb(var(--foreground))]">
            Verification code
          </label>
          <div className="flex items-center justify-between gap-2">
            {otp.slice(0, 3).map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={otpInputCls}
              />
            ))}
            <div className="flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[rgb(var(--muted-foreground))]" />
            </div>
            {otp.slice(3, 6).map((digit, i) => (
              <input
                key={i + 3}
                ref={(el) => { inputRefs.current[i + 3] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i + 3, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i + 3, e)}
                className={otpInputCls}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="new-password" className="text-sm font-medium text-[rgb(var(--foreground))]">
            New password
          </label>
          <PasswordInput
            id="new-password"
            placeholder="Min. 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirm-password" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Confirm new password
          </label>
          <PasswordInput
            id="confirm-password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Back to{" "}
        <Link href="/sign-in" className="font-medium text-[rgb(var(--primary))] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
