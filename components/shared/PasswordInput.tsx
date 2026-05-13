"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const PasswordInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={cn(
            "w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))]",
            "text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]",
            "text-sm px-3 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
