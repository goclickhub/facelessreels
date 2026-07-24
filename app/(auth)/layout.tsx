"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Middleware used to redirect away from /sign-in whenever a refreshToken
  // cookie merely existed, without checking whether it still worked — a
  // stale/expired cookie meant sign-in bounced back to a dashboard that
  // couldn't authenticate either, an infinite loop. That check has been
  // removed from middleware; this is its replacement, based on a real
  // validated session instead of just a cookie being present.
  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <AuthBrandPanel />
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-12">
        <div className="w-full max-w-md field-animate">{children}</div>
      </div>
    </div>
  );
}
