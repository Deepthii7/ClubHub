import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Club } from "@/types";
import { useClubs, useCreateClub, useDeleteClub, useUpdateClub } from "@/lib/queries";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Badge, EmptyState } from "@/components/ui/Feedback";
import ClubForm from "@/components/forms/ClubForm";

export default function ClubsPage() {
  const { data: clubs = [], isLoading } = useClubs();
  const createClub = useCreateClub();
  const updateClub = useUpdateClub();
  const deleteClub = useDeleteClub();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Club | null>(null);
  const [toDelete, setToDelete] = useState<Club | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(club: Club) {
    setEditing(club);
    setFormOpen(true);
  }

  function handleSubmit(data: Parameters<typeof createClub.mutate>[0]) {
    if (editing) {
      updateClub.mutate(
        { id: editing._id, data },
        { onSuccess: () => setFormOpen(false) }
      );
    } else {
      createClub.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  }

  return (
    <div>
      <Topbar
        title="Clubs"
        description="Manage the clubs shown in the Club Directory."
        actions={
          <Button onClick={openCreate}>
            <Plus size={16} /> Add club
          </Button>
        }
      />

      {isLoading && <p className="text-sm text-slate-400">Loading clubs...</p>}

      {!isLoading && clubs.length === 0 && (
        <EmptyState
          title="No clubs yet"
          description="Add your first club to get started."
          action={<Button onClick={openCreate}>Add club</Button>}
        />
      )}

      {clubs.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clubs.map((club) => (
                <tr key={club._id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{club.name}</p>
                    <p className="max-w-xs truncate text-slate-400">{club.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="brand">{club.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{club.contactEmail || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={club.isActive ? "green" : "slate"}>
                      {club.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(club)}>
                        <Pencil size={15} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setToDelete(club)}>
                        <Trash2 size={15} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit club" : "Add club"}
      >
        <ClubForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          submitting={createClub.isPending || updateClub.isPending}
        />
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete club?"
        description={`"${toDelete?.name}" and its association with events/announcements will be removed. This can't be undone.`}
        loading={deleteClub.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() =>
          toDelete &&
          deleteClub.mutate(toDelete._id, { onSuccess: () => setToDelete(null) })
        }
      />
    </div>
  );
}
