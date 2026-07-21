import { Loader2 } from "lucide-react";

interface AdminTableProps {
  headers: string[];
  isLoading: boolean;
  isEmpty: boolean;
  emptyMessage: string;
  /** Tailwind's JIT can't see a dynamically-interpolated min-w-[...] class,
   * so this is applied as an inline style instead of a class string. */
  minWidth?: number;
  children: React.ReactNode;
}

export function AdminTable({ headers, isLoading, isEmpty, emptyMessage, minWidth = 720, children }: AdminTableProps) {
  return (
    <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] overflow-hidden overflow-x-auto">
      <table className="w-full text-left" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-[11px] font-medium text-[rgb(var(--muted-foreground))]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgb(var(--border))]">
          {isLoading ? (
            <tr>
              <td colSpan={headers.length} className="py-16">
                <div className="flex justify-center">
                  <Loader2 size={24} className="animate-spin text-[rgb(var(--muted-foreground))]" />
                </div>
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="py-16 text-center text-[13px] text-[rgb(var(--muted-foreground))]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
