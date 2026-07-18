import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useClubs } from "@/lib/queries";
import PinnedCard from "@/components/ui/PinnedCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import type { ClubCategory } from "@/types/club";

const categories: (ClubCategory | "All")[] = [
  "All",
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

export default function ClubDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = (searchParams.get("category") as ClubCategory | "All") ?? "All";
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

  // Debounce search input into the query.
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data: clubs, isLoading, isError, refetch } = useClubs({
    search: debouncedSearch || undefined,
    category: urlCategory,
  });

  const sorted = useMemo(
    () => (clubs ? [...clubs].sort((a, b) => a.name.localeCompare(b.name)) : []),
    [clubs]
  );

  function setCategory(cat: ClubCategory | "All") {
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-poster">
          The full board
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
          Club Directory
        </h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Search by name or interest, filter by category, and click any
          flyer to see meeting times, officers, and how to join.
        </p>
      </header>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search clubs, tags, vibes…"
          aria-label="Search clubs"
          className="focus-ring w-full rounded-sm border-2 border-ink bg-paper-light py-3 pl-10 pr-4 font-body text-sm text-ink placeholder:text-ink-muted/70"
        />
      </div>

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => {
          const active = c === urlCategory;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={`focus-ring rounded-full border-2 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                active
                  ? "border-ink bg-ink text-paper-light"
                  : "border-ink/25 text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isError && (
        <>
          {!isLoading && (
            <p className="mb-6 font-mono text-xs uppercase tracking-wide text-ink-muted">
              {sorted.length} club{sorted.length === 1 ? "" : "s"} found
            </p>
          )}

          {!isLoading && sorted.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                : sorted.map((club, i) => (
                    <PinnedCard key={club.id} club={club} rotate={rotations[i % 3]} />
                  ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
