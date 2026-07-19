import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong loading this page.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-sm border-2 border-dashed border-poster/60 bg-paper-light px-6 py-10 text-center">
      <AlertTriangle className="text-poster" size={28} />
      <p className="text-sm text-ink-muted">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="focus-ring rounded-sm bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wide text-paper-light hover:bg-poster"
        >
          Try again
        </button>
      )}
    </div>
  );
}
