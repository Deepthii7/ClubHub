import { CalendarDays, Megaphone, Users, ClipboardList } from "lucide-react";
import { useDashboard } from "@/lib/queries";
import Topbar from "@/components/layout/Topbar";
import { EmptyState } from "@/components/ui/Feedback";

const cards = [
  { key: "clubs", label: "Clubs", icon: Users, tone: "bg-indigo-50 text-indigo-600" },
  { key: "events", label: "Events", icon: CalendarDays, tone: "bg-emerald-50 text-emerald-600" },
  { key: "announcements", label: "Announcements", icon: Megaphone, tone: "bg-amber-50 text-amber-600" },
  { key: "registrations", label: "Registrations", icon: ClipboardList, tone: "bg-rose-50 text-rose-600" },
] as const;

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  return (
    <div>
      <Topbar title="Dashboard" description="Overview of everything happening on ClubHub." />

      {isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't reach the Admin API. Is the backend running on the URL in your{" "}
          <code>.env</code>?
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, tone }) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-semibold text-slate-900">
              {isLoading ? "—" : data?.counts[key] ?? 0}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Upcoming events</h2>
          {isLoading && <p className="text-sm text-slate-400">Loading...</p>}
          {!isLoading && (data?.upcomingEvents.length ?? 0) === 0 && (
            <EmptyState title="No upcoming events" description="Add an event to see it here." />
          )}
          <ul className="space-y-3">
            {data?.upcomingEvents.map((ev) => (
              <li key={ev._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-800">{ev.title}</p>
                  <p className="text-slate-400">
                    {typeof ev.clubId === "object" ? ev.clubId.name : ""} · {ev.venue}
                  </p>
                </div>
                <span className="text-slate-500">{new Date(ev.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Recent registrations</h2>
          {isLoading && <p className="text-sm text-slate-400">Loading...</p>}
          {!isLoading && (data?.recentRegistrations.length ?? 0) === 0 && (
            <EmptyState title="No registrations yet" />
          )}
          <ul className="space-y-3">
            {data?.recentRegistrations.map((r) => (
              <li key={r._id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-slate-800">{r.name}</p>
                  <p className="text-slate-400">
                    {typeof r.eventId === "object" ? r.eventId.title : ""}
                  </p>
                </div>
                <span className="text-slate-500">{r.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
