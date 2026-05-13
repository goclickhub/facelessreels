import { NavIcon } from "@/lib/icons";

interface PageShellProps {
  title: string;
  icon: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageShell({ title, icon, description, children }: PageShellProps) {
  return (
    <div className="px-5 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[rgb(var(--secondary))] flex items-center justify-center">
          <NavIcon name={icon} size={20} className="text-[rgb(var(--primary))]" />
        </div>
        <div>
          <h1 className="text-[22px] font-extrabold text-[rgb(var(--foreground))] tracking-tight">{title}</h1>
          {description && <p className="text-[13px] text-[rgb(var(--muted-foreground))] mt-0.5">{description}</p>}
        </div>
      </div>
      {children ?? (
        <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-3">
          <NavIcon name={icon} size={40} className="text-[rgb(var(--border))]" />
          <p className="text-[14px] text-[rgb(var(--muted-foreground))]">
            Content for <span className="font-semibold text-[rgb(var(--foreground))]">{title}</span> will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
