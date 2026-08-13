import { useState } from "react";
import { Pencil, Plus, Trash2, MapPin } from "lucide-react";
import type { ClubEvent } from "@/types";
import { useClubs, useCreateEvent, useDeleteEvent, useEvents, useUpdateEvent } from "@/lib/queries";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Badge, EmptyState } from "@/components/ui/Feedback";
import EventForm from "@/components/forms/EventForm";

export default function EventsPage() {
  const { data: events = [], isLoading } = useEvents();
  const { data: clubs = [] } = useClubs();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ClubEvent | null>(null);
  const [toDelete, setToDelete] = useState<ClubEvent | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(event: ClubEvent) {
    setEditing(event);
    setFormOpen(true);
  }

  function handleSubmit(data: Parameters<typeof createEvent.mutate>[0]) {
    if (editing) {
      updateEvent.mutate({ id: editing._id, data }, { onSuccess: () => setFormOpen(false) });
    } else {
      createEvent.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  }

  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <Topbar
        title="Events"
        description="Manage events shown on the Events Page."
        actions={
          <Button onClick={openCreate}>
            <Plus size={16} /> Add event
          </Button>
        }
      />

      {isLoading && <p className="text-sm text-slate-400">Loading events...</p>}

      {!isLoading && events.length === 0 && (
        <EmptyState
          title="No events yet"
          description="Add your first event to get started."
          action={<Button onClick={openCreate}>Add event</Button>}
        />
      )}

      {sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((event) => {
            const past = new Date(event.date) < new Date();
            return (
              <div key={event._id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-start justify-between">
                  <Badge tone={past ? "slate" : "green"}>{past ? "Past" : "Upcoming"}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(event)}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setToDelete(event)}>
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900">{event.title}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {typeof event.clubId === "object" ? event.clubId.name : ""}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{event.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={13} /> {event.venue}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {new Date(event.date).toLocaleString()}
                </div>
                {!!event.capacity && (
                  <div className="mt-2 text-xs text-slate-400">Capacity: {event.capacity}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit event" : "Add event"}
      >
        <EventForm
          initial={editing ?? undefined}
          clubs={clubs}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          submitting={createEvent.isPending || updateEvent.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete event?"
        description={`"${toDelete?.title}" and its registrations reference will remain orphaned. This can't be undone.`}
        loading={deleteEvent.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() =>
          toDelete && deleteEvent.mutate(toDelete._id, { onSuccess: () => setToDelete(null) })
        }
      />
    </div>
  );
}
