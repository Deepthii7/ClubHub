import { useState } from "react";
import { Pencil, Pin, Plus, Trash2 } from "lucide-react";
import type { Announcement } from "@/types";
import {
  useAnnouncements,
  useClubs,
  useCreateAnnouncement,
  useDeleteAnnouncement,
  useUpdateAnnouncement,
} from "@/lib/queries";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Badge, EmptyState } from "@/components/ui/Feedback";
import AnnouncementForm from "@/components/forms/AnnouncementForm";

export default function AnnouncementsPage() {
  const { data: announcements = [], isLoading } = useAnnouncements();
  const { data: clubs = [] } = useClubs();
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [toDelete, setToDelete] = useState<Announcement | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(a: Announcement) {
    setEditing(a);
    setFormOpen(true);
  }

  function handleSubmit(data: Parameters<typeof createAnnouncement.mutate>[0]) {
    if (editing) {
      updateAnnouncement.mutate(
        { id: editing._id, data },
        { onSuccess: () => setFormOpen(false) }
      );
    } else {
      createAnnouncement.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  }

  const sorted = [...announcements].sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <Topbar
        title="Announcements"
        description="Manage posts shown on the Announcement Board."
        actions={
          <Button onClick={openCreate}>
            <Plus size={16} /> New announcement
          </Button>
        }
      />

      {isLoading && <p className="text-sm text-slate-400">Loading announcements...</p>}

      {!isLoading && announcements.length === 0 && (
        <EmptyState
          title="No announcements yet"
          description="Post your first announcement."
          action={<Button onClick={openCreate}>New announcement</Button>}
        />
      )}

      <div className="space-y-3">
        {sorted.map((a) => (
          <div key={a._id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {a.pinned && <Pin size={14} className="text-brand-600" />}
                  <h3 className="font-semibold text-slate-900">{a.title}</h3>
                </div>
                <p className="mt-1 text-sm text-slate-500">{a.content}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="brand">
                    {typeof a.clubId === "object" && a.clubId ? a.clubId.name : "Platform-wide"}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="sm" onClick={() => openEdit(a)}>
                  <Pencil size={15} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setToDelete(a)}>
                  <Trash2 size={15} className="text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit announcement" : "New announcement"}
      >
        <AnnouncementForm
          initial={editing ?? undefined}
          clubs={clubs}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          submitting={createAnnouncement.isPending || updateAnnouncement.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete announcement?"
        description={`"${toDelete?.title}" will be removed from the Announcement Board.`}
        loading={deleteAnnouncement.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() =>
          toDelete &&
          deleteAnnouncement.mutate(toDelete._id, { onSuccess: () => setToDelete(null) })
        }
      />
    </div>
  );
}
