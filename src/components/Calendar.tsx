// components/Calendar.tsx
"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // default styles (optional)
import { cn } from "@/lib/utils"; // this merges Tailwind classes

export function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn("rounded-md border p-3", className)}
      {...props}
    />
  );
}
