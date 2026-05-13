"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResent(true);
    }, 1500);
  };

  if (verified) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">Email verified!</h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Your account is ready. Let&apos;s get started.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="flex w-full items-center justify-center rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Go to Dashboard
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
          We sent a verification link to{" "}
          <span className="font-medium text-[rgb(var(--foreground))]">you@example.com</span>
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        {[
          { step: 1, text: <>Open the email from <span className="font-medium text-[rgb(var(--foreground))]">FacelessReels</span></> },
          { step: 2, text: <>Click the <span className="font-medium text-[rgb(var(--foreground))]">Verify email</span> button in the email</> },
          { step: 3, text: <>You&apos;ll be redirected back automatically</> },
        ].map(({ step, text }) => (
          <div key={step} className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: "rgb(var(--primary) / 0.12)",
                color: "rgb(var(--primary))",
              }}
            >
              {step}
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">{text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setVerified(true)}
        className="flex w-full items-center justify-center rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        I&apos;ve verified my email
      </button>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Didn&apos;t receive it?{" "}
        {resent ? (
          <span className="font-medium text-green-500">Email resent!</span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1 font-medium text-[rgb(var(--primary))] hover:underline disabled:opacity-60"
          >
            {resending && <RefreshCw className="h-3 w-3 animate-spin" />}
            Resend email
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
