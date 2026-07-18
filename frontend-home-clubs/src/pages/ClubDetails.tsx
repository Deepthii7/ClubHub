import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Mail,
  AtSign,
  CalendarDays,
} from "lucide-react";
import { useClub } from "@/lib/queries";
import { getCoverColor } from "@/lib/colorMap";
import Tag from "@/components/ui/Tag";
import ErrorState from "@/components/ui/ErrorState";

export default function ClubDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: club, isLoading, isError, refetch } = useClub(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-5 py-16 sm:px-8">
        <div className="h-40 rounded-sm border-2 border-ink/20 bg-ink/10" />
        <div className="mt-8 h-8 w-1/2 rounded bg-ink/10" />
        <div className="mt-4 h-4 w-full rounded bg-ink/10" />
        <div className="mt-2 h-4 w-2/3 rounded bg-ink/10" />
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <ErrorState
          message="We couldn't find that club — it may have been unpinned."
          onRetry={slug ? () => refetch() : undefined}
        />
        <div className="mt-6 text-center">
          <Link to="/clubs" className="focus-ring font-mono text-sm text-ink underline">
            Back to the directory
          </Link>
        </div>
      </div>
    );
  }

  const cover = getCoverColor(club.coverColor);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        to="/clubs"
        className="focus-ring mb-8 inline-flex items-center gap-2 rounded-sm font-mono text-sm uppercase tracking-wide text-ink-muted hover:text-poster"
      >
        <ArrowLeft size={16} /> Back to directory
      </Link>

      {/* Poster header */}
      <div className="relative rounded-sm border-2 border-ink shadow-[6px_6px_0_0_var(--color-ink)]">
        <span className="pushpin absolute left-1/2 top-0 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-poster" />
        <div className={`rounded-t-[2px] border-b-2 border-ink px-6 py-10 sm:px-10 sm:py-14 ${cover.bg}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-sm border border-current px-2.5 py-1 font-mono text-xs uppercase tracking-widest ${cover.text}`}>
              {club.category}
            </span>
            {club.recruiting && (
              <span className="rounded-sm bg-paper-light px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-ink">
                Now recruiting
              </span>
            )}
          </div>
          <h1 className={`mt-5 font-display text-4xl leading-[0.95] sm:text-6xl ${cover.text}`}>
            {club.name}
          </h1>
          <p className={`mt-4 max-w-xl text-base opacity-90 sm:text-lg ${cover.text}`}>
            {club.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 bg-paper-light px-6 py-8 sm:grid-cols-3 sm:px-10 sm:py-10">
          {/* Main content */}
          <div className="sm:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-poster">
              About the club
            </h2>
            <p className="mt-3 leading-relaxed text-ink">{club.description}</p>

            <h2 className="mt-8 font-mono text-xs uppercase tracking-widest text-poster">
              Tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {club.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <h2 className="mt-8 font-mono text-xs uppercase tracking-widest text-poster">
              Officers
            </h2>
            <ul className="mt-3 divide-y divide-dashed divide-ink/20 border-y border-dashed border-ink/20">
              {club.officers.map((o) => (
                <li key={o.name} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-ink">{o.name}</span>
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-muted">
                    {o.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ticket-stub sidebar */}
          <aside className="relative">
            <div className="sticky top-24 rounded-sm border-2 border-dashed border-ink/40 bg-paper p-5">
              <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink">
                <CalendarDays size={14} className="text-poster" /> Meets weekly
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="mt-0.5 shrink-0 text-ink-muted" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      Day &amp; time
                    </dt>
                    <dd className="text-ink">
                      {club.meeting.day} · {club.meeting.time}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-ink-muted" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      Location
                    </dt>
                    <dd className="text-ink">{club.meeting.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users size={16} className="mt-0.5 shrink-0 text-ink-muted" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      Members
                    </dt>
                    <dd className="text-ink">{club.memberCount} active</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 shrink-0 text-center font-mono text-xs text-ink-muted">
                    ’{String(club.founded).slice(-2)}
                  </span>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      Founded
                    </dt>
                    <dd className="text-ink">{club.founded}</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 space-y-2 border-t-2 border-dashed border-ink/30 pt-5">
                <a
                  href={`mailto:${club.contactEmail}`}
                  className="focus-ring flex items-center justify-center gap-2 rounded-sm border-2 border-ink bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-paper-light hover:bg-poster hover:border-poster"
                >
                  <Mail size={14} /> Email the club
                </a>
                {club.instagram && (
                  <a
                    href={`https://instagram.com/${club.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex items-center justify-center gap-2 rounded-sm border-2 border-ink bg-paper-light px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-ink hover:border-poster hover:text-poster"
                  >
                    <AtSign size={14} /> {club.instagram}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
