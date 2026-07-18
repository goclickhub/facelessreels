"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import RecentVideoPanel from "@/components/dashboard/RecentVideoPanel";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const showPanel = pathname === "/dashboard";
  const { user, isLoading } = useAuth();

  // Middleware only checks whether a refreshToken cookie is *present*, not
  // whether it's still valid — a stale cookie can land someone here with no
  // real session. Once the /auth/me check definitively fails, bounce to
  // sign-in instead of rendering a dashboard full of components that'll all
  // fail their own data fetches.
  useEffect(() => {
    if (!isLoading && !user) router.replace("/sign-in");
  }, [isLoading, user, router]);

  if (isLoading || !user) return null;

  return (
    <DashboardShell rightPanel={showPanel ? <RecentVideoPanel /> : undefined}>
      {children}
    </DashboardShell>
  );
}
