import { FormEvent, useState } from "react";
import type { Club, ClubInput, Category } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const categories: Category[] = [
  "Technical",
  "Cultural",
  "Sports",
  "Literary",
  "Arts",
  "Social",
  "Other",
];

interface ClubFormProps {
  initial?: Club;
  onSubmit: (data: ClubInput) => void;
  onCancel: () => void;
  submitting?: boolean;
}

export default function ClubForm({ initial, onSubmit, onCancel, submitting }: ClubFormProps) {
  const [form, setForm] = useState<ClubInput>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "Technical",
    logoUrl: initial?.logoUrl ?? "",
    contactEmail: initial?.contactEmail ?? "",
    isActive: initial?.isActive ?? true,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Club name"
        name="name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="e.g. Codeverse"
      />
      <Textarea
        label="Description"
        name="description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="What does this club do?"
      />
      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Input
        label="Contact email"
        name="contactEmail"
        type="email"
        value={form.contactEmail}
        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        placeholder="club@college.edu"
      />
      <Input
        label="Logo URL (optional)"
        name="logoUrl"
        value={form.logoUrl}
        onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
        placeholder="https://..."
      />
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        Active
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save changes" : "Create club"}
        </Button>
      </div>
    </form>
  );
}
