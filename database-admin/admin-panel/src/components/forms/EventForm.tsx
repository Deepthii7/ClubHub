import { FormEvent, useState } from "react";
import type { Club, ClubEvent, ClubEventInput } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface EventFormProps {
  initial?: ClubEvent;
  clubs: Club[];
  onSubmit: (data: ClubEventInput) => void;
  onCancel: () => void;
  submitting?: boolean;
}

// datetime-local inputs need "YYYY-MM-DDTHH:mm"
function toLocalInputValue(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function EventForm({ initial, clubs, onSubmit, onCancel, submitting }: EventFormProps) {
  const initialClubId =
    typeof initial?.clubId === "string" ? initial.clubId : initial?.clubId?._id ?? clubs[0]?._id ?? "";

  const [form, setForm] = useState<ClubEventInput>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    date: initial?.date ?? "",
    venue: initial?.venue ?? "",
    clubId: initialClubId,
    bannerUrl: initial?.bannerUrl ?? "",
    capacity: initial?.capacity ?? 0,
  });

  const [dateInput, setDateInput] = useState(toLocalInputValue(initial?.date));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ ...form, date: new Date(dateInput).toISOString() });
  }

  if (clubs.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Create a club first — events must belong to a club.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Event title"
        name="title"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="e.g. HackNight 2026"
      />
      <Textarea
        label="Description"
        name="description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Select
        label="Club"
        name="clubId"
        required
        value={form.clubId}
        onChange={(e) => setForm({ ...form, clubId: e.target.value })}
      >
        {clubs.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </Select>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Date & time"
          name="date"
          type="datetime-local"
          required
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <Input
          label="Venue"
          name="venue"
          required
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          placeholder="e.g. Main Auditorium"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Capacity (0 = unlimited)"
          name="capacity"
          type="number"
          min={0}
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
        />
        <Input
          label="Banner URL (optional)"
          name="bannerUrl"
          value={form.bannerUrl}
          onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save changes" : "Create event"}
        </Button>
      </div>
    </form>
  );
}
