import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminBreadcrumb({ page }: { page: string }) {
  return (
    <div className="space-y-2">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <Link href="/admin" className="hover:text-[rgb(var(--foreground))] hover:underline">
          Admin
        </Link>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">{page}</span>
      </nav>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[rgb(var(--primary))] hover:underline"
      >
        <ArrowLeft size={13} /> Back to Admin overview
      </Link>
    </div>
  );
}
