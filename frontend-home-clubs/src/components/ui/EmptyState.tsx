import { PinOff } from "lucide-react";

export default function EmptyState({
  title = "No clubs pinned here yet",
  message = "Try a different search term or category.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-sm border-2 border-dashed border-ink/25 bg-paper-light px-6 py-16 text-center">
      <PinOff className="text-ink-muted" size={30} />
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="text-sm text-ink-muted">{message}</p>
    </div>
  );
}
