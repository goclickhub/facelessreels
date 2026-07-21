"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Same pattern as the parent (dashboard) layout's dead-session redirect:
// middleware only checks whether a session exists at all, so the
// finer-grained "is this actually an admin" rule is enforced here, client-side,
// once /auth/me has resolved.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") router.replace("/dashboard");
  }, [isLoading, user, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  return <>{children}</>;
}
