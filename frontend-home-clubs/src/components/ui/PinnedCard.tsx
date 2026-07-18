import { Link } from "react-router-dom";
import { Users, MapPin } from "lucide-react";
import type { Club } from "@/types/club";
import { getCoverColor } from "@/lib/colorMap";

interface PinnedCardProps {
  club: Club;
  rotate?: "left" | "right" | "none";
}

const rotateClass = {
  left: "-rotate-2 hover:rotate-0",
  right: "rotate-2 hover:rotate-0",
  none: "hover:-translate-y-1",
};

export default function PinnedCard({ club, rotate = "left" }: PinnedCardProps) {
  const cover = getCoverColor(club.coverColor);

  return (
    <Link
      to={`/clubs/${club.slug}`}
      className={`focus-ring group relative block w-full max-w-sm rounded-sm border-2 border-ink bg-paper-light shadow-[4px_4px_0_0_var(--color-ink)] transition-all duration-200 ${rotateClass[rotate]}`}
    >
      {/* pushpin */}
      <span className="pushpin absolute left-1/2 top-0 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-poster" />

      <div className={`flex h-24 items-end justify-between border-b-2 border-ink px-4 pb-3 ${cover.bg}`}>
        <span className={`font-mono text-xs uppercase tracking-widest ${cover.text}`}>
          {club.category}
        </span>
        {club.recruiting && (
          <span className="rounded-sm bg-paper-light px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink">
            Recruiting
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display text-2xl leading-tight text-ink group-hover:text-poster">
          {club.name}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{club.tagline}</p>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink/30 pt-3 font-mono text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <Users size={13} /> {club.memberCount}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin size={13} /> {club.meeting.day}
          </span>
        </div>
      </div>
    </Link>
  );
}
