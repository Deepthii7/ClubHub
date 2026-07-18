import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm border border-ink/20 bg-paper px-2.5 py-1 font-mono text-xs text-ink-muted">
      #{children}
    </span>
  );
}
