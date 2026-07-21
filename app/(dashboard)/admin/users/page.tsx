"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useAdminUsers } from "@/hooks/useAdmin";
import { Pagination } from "@/components/ui/Pagination";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { AdminTable } from "@/components/admin/AdminTable";
import { UserRow } from "@/components/admin/UserRow";

const PAGE_SIZE = 10;
const HEADERS = ["Email", "Name", "Role", "Plan", "Verified", "Series", "Videos", "Joined", ""];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isPlaceholderData } = useAdminUsers(page, PAGE_SIZE);
  const users = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <AdminBreadcrumb page="Users" />

      <div className="flex items-center gap-2">
        <Users size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">Users ({total})</h1>
      </div>

      <AdminTable headers={HEADERS} isLoading={isLoading} isEmpty={users.length === 0} emptyMessage="No users found" minWidth={760}>
        {users.map((u) => (
          <UserRow key={u.id} user={u} />
        ))}
      </AdminTable>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        nextDisabled={isPlaceholderData}
        label={`Page ${page} of ${totalPages}`}
      />
    </div>
  );
}
