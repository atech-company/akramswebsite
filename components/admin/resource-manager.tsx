"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { resourceConfigs, type FormField } from "@/lib/admin/resources";
import { fetchResource, createResource, updateResource, deleteResource, uploadAdminImage } from "@/services/admin-api";
import { ImageUploadField } from "@/components/shared/image-upload-field";

interface ResourceManagerProps {
  resourceKey: string;
}

export function ResourceManager({ resourceKey }: ResourceManagerProps) {
  const config = resourceConfigs[resourceKey];
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin", resourceKey, search],
    queryFn: () => fetchResource(resourceKey, { search: search || undefined }),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editing?.id) {
        return updateResource(resourceKey, editing.id as number, form);
      }
      return createResource(resourceKey, form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resourceKey] });
      toast.success(editing ? "Updated successfully" : "Created successfully");
      closeModal();
    },
    onError: () => toast.error("Failed to save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteResource(resourceKey, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resourceKey] });
      toast.success("Deleted");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const openCreate = () => {
    setEditing(null);
    const defaults: Record<string, unknown> = {};
    config.fields.forEach((f) => {
      if (f.type === "boolean") defaults[f.name] = true;
      else if (f.type === "number") defaults[f.name] = 0;
      else defaults[f.name] = "";
    });
    setForm(defaults);
    setModalOpen(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm({});
  };

  const items = data?.data ?? [];

  if (!config) return <p>Resource not found</p>;

  return (
    <div>
      <AdminHeader title={config.label} description={`Manage all ${config.label.toLowerCase()}`} />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input placeholder="Search..." className="pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add {config.singular}</Button>
      </div>

      <div className="glass rounded-[24px] border border-white/8 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-muted text-left">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium hidden md:table-cell">Slug</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: Record<string, unknown>) => (
                  <tr key={item.id as number} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{(item.title ?? item.name ?? item.question) as string}</td>
                    <td className="p-4 text-muted hidden md:table-cell">{(item.slug as string) ?? "—"}</td>
                    <td className="p-4 hidden lg:table-cell">
                      {item.is_published !== undefined && (
                        <Badge variant={item.is_published ? "default" : "secondary"}>
                          {item.is_published ? "Published" : "Draft"}
                        </Badge>
                      )}
                      {item.is_active !== undefined && (
                        <Badge variant={item.is_active ? "default" : "secondary"}>
                          {item.is_active ? "Active" : "Inactive"}
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm" variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => {
                            if (confirm("Delete this item?")) deleteMutation.mutate(item.id as number);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!items.length && (
                  <tr><td colSpan={4} className="p-12 text-center text-muted">No items found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {data?.last_page > 1 && (
          <div className="p-4 border-t border-white/8 text-sm text-muted text-center">
            Page {data.current_page} of {data.last_page} · {data.total} total
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-[24px] border border-white/10 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editing ? "Edit" : "Create"} {config.singular}</h2>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-white/5"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {config.fields.map((field) => (
                <FormFieldInput
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  uploadFolder={resourceKey}
                  onChange={(v) => setForm({ ...form, [field.name]: v })}
                />
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="secondary" className="flex-1" onClick={closeModal}>Cancel</Button>
              <Button className="flex-1" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormFieldInput({ field, value, onChange, uploadFolder }: {
  field: FormField; value: unknown; onChange: (v: unknown) => void; uploadFolder?: string;
}) {
  if (field.type === "image") {
    return (
      <ImageUploadField
        label={field.label}
        value={(value as string) ?? ""}
        onChange={onChange}
        required={field.required}
        onUpload={(file) => uploadAdminImage(file, uploadFolder)}
      />
    );
  }
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="rounded" />
        <span className="text-sm">{field.label}</span>
      </label>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="text-sm text-muted mb-2 block">{field.label}</label>
        <textarea
          className="flex min-h-[100px] w-full rounded-[24px] border border-white/10 bg-white/5 px-5 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className="text-sm text-muted mb-2 block">{field.label}</label>
        <select
          className="flex h-12 w-full rounded-[24px] border border-white/10 bg-white/5 px-5 text-sm"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select...</option>
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div>
      <label className="text-sm text-muted mb-2 block">{field.label}</label>
      <Input
        type={field.type === "number" ? "number" : field.type === "date" ? "datetime-local" : "text"}
        value={(value as string | number) ?? ""}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}
