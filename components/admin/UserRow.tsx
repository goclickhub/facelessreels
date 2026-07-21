import { useAuth } from "@/hooks/useAuth";
import { UserActionsMenu } from "@/components/admin/UserActionsMenu";
import type { AdminUser } from "@/hooks/useAdmin";

export function UserRow({ user }: { user: AdminUser }) {
  const { user: currentUser } = useAuth();

  return (
    <tr className="hover:bg-[rgb(var(--muted))] transition-colors">
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))]">{user.email}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))]">{user.name}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            user.role === "admin"
              ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
              : "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))] capitalize">{user.plan}</td>
      <td className="px-4 py-3 text-[12px]">
        {user.emailVerified ? (
          <span className="text-green-600 dark:text-green-400">Yes</span>
        ) : (
          <span className="text-[rgb(var(--muted-foreground))]">No</span>
        )}
      </td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))]">{user.seriesCount}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))]">{user.videoCount}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))]">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">{user.id !== currentUser?.id && <UserActionsMenu user={user} />}</td>
    </tr>
  );
}
