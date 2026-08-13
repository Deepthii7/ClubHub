import { useMemo, useState } from "react";
import { Trash2, Search } from "lucide-react";
import type { Registration } from "@/types";
import { useDeleteRegistration, useRegistrations } from "@/lib/queries";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/Feedback";

export default function RegistrationsPage() {
  const { data: registrations = [], isLoading } = useRegistrations();
  const deleteRegistration = useDeleteRegistration();
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<Registration | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return registrations;
    return registrations.filter((r) => {
      const eventTitle = typeof r.eventId === "object" ? r.eventId.title : "";
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.rollNo ?? "").toLowerCase().includes(q) ||
        eventTitle.toLowerCase().includes(q)
      );
    });
  }, [registrations, search]);

  return (
    <div>
      <Topbar
        title="Registrations"
        description="Everyone who registered for an event, across all clubs."
        actions={
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, event..."
              className="w-64 rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        }
      />

      {isLoading && <p className="text-sm text-slate-400">Loading registrations...</p>}

      {!isLoading && filtered.length === 0 && (
        <EmptyState
          title={search ? "No matches" : "No registrations yet"}
          description={search ? "Try a different search term." : "Registrations will appear here once students sign up for events."}
        />
      )}

      {filtered.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Roll No.</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r._id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.name}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {typeof r.eventId === "object" ? r.eventId.title : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{r.email}</td>
                  <td className="px-4 py-3 text-slate-500">{r.phone || "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{r.rollNo || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setToDelete(r)}>
                      <Trash2 size={15} className="text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Remove registration?"
        description={`Remove ${toDelete?.name}'s registration? This can't be undone.`}
        loading={deleteRegistration.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() =>
          toDelete &&
          deleteRegistration.mutate(toDelete._id, { onSuccess: () => setToDelete(null) })
        }
      />
    </div>
  );
}
