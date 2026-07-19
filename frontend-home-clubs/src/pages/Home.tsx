import { Link } from "react-router-dom";
import { ArrowRight, Pin } from "lucide-react";
import { useClubs } from "@/lib/queries";
import PinnedCard from "@/components/ui/PinnedCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import ErrorState from "@/components/ui/ErrorState";

const categories = [
  "Technology",
  "Arts & Culture",
  "Sports",
  "Academic",
  "Music",
  "Social Impact",
  "Gaming",
  "Business",
];

const rotations: Array<"left" | "right" | "none"> = ["left", "right", "none"];

export default function Home() {
  const { data: clubs, isLoading, isError, refetch } = useClubs();
  const featured = clubs?.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero — corkboard */}
      <section className="cork-texture torn-edge relative overflow-hidden border-b-2 border-ink pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-sm border-2 border-ink bg-signal px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--color-ink)]">
              <Pin size={13} /> {clubs ? clubs.length : "60+"} clubs pinned up
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] text-paper-light drop-shadow-[3px_3px_0_rgba(0,0,0,0.4)] sm:text-7xl">
              Find your people on campus.
            </h1>
            <p className="mt-5 max-w-lg text-base text-paper-light/90 sm:text-lg">
              Every student club, printed to a flyer and pinned in one place.
              Browse by interest, see exactly when they meet, and show up to
              the next one.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/clubs"
                className="focus-ring flex items-center gap-2 rounded-sm border-2 border-ink bg-poster px-5 py-3 font-mono text-sm uppercase tracking-wide text-paper-light shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                Browse the directory <ArrowRight size={16} />
              </Link>
              <a
                href="#featured"
                className="focus-ring flex items-center gap-2 rounded-sm border-2 border-ink bg-paper-light px-5 py-3 font-mono text-sm uppercase tracking-wide text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                See what's featured
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b-2 border-ink bg-paper-light py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 sm:px-8">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/clubs?category=${encodeURIComponent(c)}`}
              className="focus-ring rounded-full border border-ink/25 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-ink-muted transition-colors hover:border-poster hover:text-poster"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured clubs */}
      <section id="featured" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-poster">
              This week on the board
            </p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              Featured clubs
            </h2>
          </div>
          <Link
            to="/clubs"
            className="focus-ring hidden shrink-0 items-center gap-1 font-mono text-sm uppercase tracking-wide text-ink hover:text-poster sm:flex"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {isError && <ErrorState onRetry={() => refetch()} />}

        {!isError && (
          <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
              : featured.map((club, i) => (
                  <PinnedCard key={club.id} club={club} rotate={rotations[i % 3]} />
                ))}
          </div>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            to="/clubs"
            className="focus-ring flex items-center gap-1 font-mono text-sm uppercase tracking-wide text-ink hover:text-poster"
          >
            View all clubs <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-y-2 border-ink bg-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-3xl text-paper-light sm:text-4xl">
              Can't find your club yet?
            </h2>
            <p className="mt-2 max-w-md text-sm text-paper/70">
              New clubs get pinned up every semester. Check the full
              directory or reach out to Student Life to start one.
            </p>
          </div>
          <Link
            to="/clubs"
            className="focus-ring flex shrink-0 items-center gap-2 rounded-sm border-2 border-paper-light bg-signal px-5 py-3 font-mono text-sm uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
          >
            Open directory <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
