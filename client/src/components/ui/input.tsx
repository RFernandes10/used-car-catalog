import { cn } from "@/lib/utils";
import * as React from "react";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-background border-border h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
}

export { Input };
