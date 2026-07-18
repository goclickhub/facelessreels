"use client";

import Link from "next/link";
import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailForm />
    </Suspense>
  );
}

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();
  const { verifyEmailMutation, resendVerificationMutation } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);
  const loading = verifyEmailMutation.isPending;
  const resending = resendVerificationMutation.isPending;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
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
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = async () => {
    try {
      await resendVerificationMutation.mutateAsync({ email });
      setResent(true);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong.";
      toastError("Couldn't resend", message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      toastError("Incomplete code", "Please enter all 6 digits.");
      return;
    }

    try {
      await verifyEmailMutation.mutateAsync({ email, code });
      toastSuccess("Email verified!", "Your account is ready.");
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Verification failed", message);
    }
  };

  const otpInputCls =
    "h-11 w-11 rounded-lg border-2 border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-center text-lg font-semibold text-[rgb(var(--foreground))] outline-none transition focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]/20";

  return (
    <div className="space-y-6">
      <Link
        href="/sign-in"
        className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
      </Link>

      <div className="flex justify-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgb(var(--primary) / 0.12)" }}
        >
          <Mail className="h-8 w-8" style={{ color: "rgb(var(--primary))" }} />
        </div>
      </div>

      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--foreground))]">
          Verify your email
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Enter the 6-digit code we sent to{" "}
          <span className="font-medium text-[rgb(var(--foreground))]">{email || "your email"}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          {otp.slice(0, 3).map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
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
              ref={(el) => {
                inputRefs.current[i + 3] = el;
              }}
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

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Verifying..." : "Verify email"}
        </button>
      </form>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Didn&apos;t receive it?{" "}
        {resent ? (
          <span className="font-medium text-green-500">Code resent!</span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1 font-medium text-[rgb(var(--primary))] hover:underline disabled:opacity-60"
          >
            {resending && <RefreshCw className="h-3 w-3 animate-spin" />}
            Resend code
          </button>
        )}
      </p>

      <p className="text-center text-xs text-[rgb(var(--muted-foreground))]">
        Wrong email?{" "}
        <Link href="/sign-up" className="text-[rgb(var(--primary))] hover:underline">
          Go back and change it
        </Link>
      </p>
    </div>
  );
}
