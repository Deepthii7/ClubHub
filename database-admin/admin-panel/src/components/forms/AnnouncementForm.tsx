import { FormEvent, useState } from "react";
import type { Announcement, AnnouncementInput, Club } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface AnnouncementFormProps {
  initial?: Announcement;
  clubs: Club[];
  onSubmit: (data: AnnouncementInput) => void;
  onCancel: () => void;
  submitting?: boolean;
}

export default function AnnouncementForm({
  initial,
  clubs,
  onSubmit,
  onCancel,
  submitting,
}: AnnouncementFormProps) {
  const initialClubId =
    typeof initial?.clubId === "string" ? initial.clubId : initial?.clubId?._id ?? "";

  const [form, setForm] = useState<AnnouncementInput>({
    title: initial?.title ?? "",
    content: initial?.content ?? "",
    clubId: initialClubId,
    pinned: initial?.pinned ?? false,
    date: initial?.date ?? "",
    time: initial?.time ?? "",
    venue: initial?.venue ?? "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ ...form, clubId: form.clubId || undefined });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="e.g. Registrations open for HackNight!"
      />
      <Textarea
        label="Content"
        name="content"
        required
        rows={4}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <Select
        label="Club (optional — leave blank for platform-wide)"
        name="clubId"
        value={form.clubId ?? ""}
        onChange={(e) => setForm({ ...form, clubId: e.target.value })}
      >
      <Input
        label="Date"
        name="date"
        type="date"
        value={form.date ?? ""}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <Input
        label="Time"
        name="time"
        type="time"
        value={form.time ?? ""}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />

      <Input
        label="Venue"
        name="venue"
        value={form.venue ?? ""}
        onChange={(e) => setForm({ ...form, venue: e.target.value })}
        placeholder="e.g. Main Lab, Room 101"
      />
        <option value="">Platform-wide</option>
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </Select>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.pinned}
          onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        Pin to top of board
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save changes" : "Post announcement"}
        </Button>
      </div>
    </form>
  );
}
