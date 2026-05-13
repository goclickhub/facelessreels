"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import GoogleButton from "@/components/shared/GoogleButton";
import PasswordInput from "@/components/shared/PasswordInput";

const inputCls =
  "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { success: toastSuccess } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toastSuccess("Account created!", "Please check your email to verify your account.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--foreground))]">
          Create your account
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Start creating faceless reels in minutes
        </p>
      </div>

      <GoogleButton label="Sign up with Google" />

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-[rgb(var(--border))]" />
        <span className="text-xs text-[rgb(var(--muted-foreground))]">or continue with email</span>
        <div className="h-px flex-1 bg-[rgb(var(--border))]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Email
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

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Password
          </label>
          <PasswordInput id="password" placeholder="Min. 8 characters" required />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirm" className="text-sm font-medium text-[rgb(var(--foreground))]">
            Confirm password
          </label>
          <PasswordInput id="confirm" placeholder="Repeat your password" required />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[rgb(var(--border))] accent-[rgb(var(--primary))]"
          />
          <label
            htmlFor="terms"
            className="cursor-pointer text-sm leading-relaxed text-[rgb(var(--muted-foreground))]"
          >
            I agree to the{" "}
            <Link href="#" className="text-[rgb(var(--primary))] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[rgb(var(--primary))] hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Create free account"}
        </button>
      </form>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-[rgb(var(--primary))] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
