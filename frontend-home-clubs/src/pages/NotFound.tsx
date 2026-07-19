import { Link } from "react-router-dom";
import { Pin, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-28 text-center sm:px-8">
      <Pin size={36} className="-rotate-12 text-poster" />
      <h1 className="mt-6 font-display text-6xl text-ink">404</h1>
      <p className="mt-3 text-ink-muted">
        This flyer must have fallen off the board. The page you're looking
        for doesn't exist.
      </p>
      <Link
        to="/"
        className="focus-ring mt-8 flex items-center gap-2 rounded-sm border-2 border-ink bg-ink px-5 py-3 font-mono text-sm uppercase tracking-wide text-paper-light hover:bg-poster hover:border-poster"
      >
        <ArrowLeft size={16} /> Back home
      </Link>
    </div>
  );
}
