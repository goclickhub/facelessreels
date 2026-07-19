"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api";
import PasswordInput from "@/components/shared/PasswordInput";

const inputCls =
  "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { loginMutation } = useAuth();
  const { success: toastSuccess, error: toastError } = useToast();
  const router = useRouter();
  const loading = loginMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      toastSuccess("Welcome back!", "You have been signed in successfully.");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.code === "EMAIL_NOT_VERIFIED") {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Sign in failed", message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--foreground))]">
          Welcome back
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Sign in to your FacelessReels account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[rgb(var(--foreground))]"
          >
            Email
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[rgb(var(--foreground))]"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[rgb(var(--primary))] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-[rgb(var(--border))] accent-[rgb(var(--primary))]"
          />
          <label
            htmlFor="remember"
            className="cursor-pointer text-sm text-[rgb(var(--muted-foreground))]"
          >
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-[rgb(var(--primary))] hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  );
}
