// lib/icon-map.ts
import * as Icons from "lucide-react";

export type LucideIconName = keyof typeof Icons;

export const lucideIconsList = Object.keys(Icons).sort() as LucideIconName[];

export function getLucideIcon(name: string): LucideIconName {
  return name in Icons ? (name as LucideIconName) : "CircleAlert";
}

export function getLucideComponent(name: string) {
  return Icons[getLucideIcon(name)] as React.FC<React.SVGProps<SVGSVGElement>>;
}
