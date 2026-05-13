import AuthBrandPanel from "@/components/auth/AuthBrandPanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <AuthBrandPanel />
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-12">
        <div className="w-full max-w-md field-animate">{children}</div>
      </div>
    </div>
  );
}
