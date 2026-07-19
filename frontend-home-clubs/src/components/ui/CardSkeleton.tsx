export default function CardSkeleton() {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-sm border-2 border-ink/20 bg-paper-light">
      <div className="h-24 border-b-2 border-ink/20 bg-ink/10" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 rounded bg-ink/10" />
        <div className="h-3 w-full rounded bg-ink/10" />
        <div className="h-3 w-4/5 rounded bg-ink/10" />
        <div className="mt-4 h-3 w-1/2 rounded bg-ink/10" />
      </div>
    </div>
  );
}
