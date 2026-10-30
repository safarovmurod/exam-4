import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2563eb] text-[#ffffff] shadow hover:bg-[#1d4ed8]",
        secondary:
          "border-transparent bg-[#f1f5f9] text-[#0f172a] hover:bg-[#e2e8f0]",
        destructive:
          "border-transparent bg-[#ef4444] text-[#ffffff] shadow hover:bg-[#dc2626]",
        outline: "text-[#0f172a]",
        success:
          "border-transparent bg-[#dcfce7] text-[#15803d]",
        warning:
          "border-transparent bg-[#fef3c7] text-[#b45309]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

