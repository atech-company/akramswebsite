"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, Eye, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/admin-shell";
import { AdminSelect } from "@/components/admin/admin-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchRegistrations, updateRegistrationStatus, deleteRegistration } from "@/services/admin-api";
import {
  getCourseLabel,
  getOutcomeLabels,
  getSkillLevelLabel,
  HEAR_ABOUT_OPTIONS,
  PAYMENT_METHODS,
} from "@/lib/course-registration";

const statuses = ["new", "reviewed", "contacted", "enrolled", "archived"] as const;

type Registration = {
  id: number;
  name: string;
  whatsapp: string;
  email: string;
  age: number;
  country: string;
  photo: string;
  major: string;
  skill_level: string;
  course_name: string;
  why_join: string;
  expected_outcomes: string[];
  expected_outcomes_other?: string;
  hear_about: string;
  payment_method: string;
  status: string;
  created_at: string;
};

function labelFor(value: string, options: readonly { value: string; label: string }[]) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default function AdminRegistrationsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-registrations", search],
    queryFn: () => fetchRegistrations({ search: search || undefined }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateRegistrationStatus(id, status),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
      setSelected((s) => (s?.id === updated.id ? { ...s, ...updated } : s));
      toast.success("Status updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-registrations"] });
      setSelected(null);
      toast.success("Deleted");
    },
  });

  const items: Registration[] = data?.data ?? [];

  return (
    <div>
      <AdminHeader title="Course Registrations" description="All submitted enrollment forms" />

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input placeholder="Search name, email, WhatsApp..." className="pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="glass rounded-[24px] border border-white/8 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-muted text-left">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium hidden md:table-cell">Course</th>
                  <th className="p-4 font-medium hidden lg:table-cell">WhatsApp</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-muted">{r.email}</p>
                    </td>
                    <td className="p-4 text-muted hidden md:table-cell max-w-[200px] truncate">{getCourseLabel(r.course_name)}</td>
                    <td className="p-4 text-muted hidden lg:table-cell">{r.whatsapp}</td>
                    <td className="p-4">
                      <Badge variant={r.status === "new" ? "default" : "secondary"} className="capitalize">{r.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setSelected(r)}><Eye className="h-4 w-4" /></Button>
                        <Button
                          size="sm" variant="ghost" className="text-red-400"
                          onClick={() => { if (confirm("Delete this registration?")) deleteMutation.mutate(r.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!items.length && <tr><td colSpan={5} className="p-12 text-center text-muted">No registrations yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass rounded-[24px] border border-white/10 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-white/5"><X className="h-5 w-5" /></button>
            </div>

            <dl className="space-y-4 text-sm">
              {selected.photo && (
                <div>
                  <dt className="text-muted text-xs uppercase tracking-wide mb-2">Photo</dt>
                  <dd className="relative h-32 w-32 rounded-2xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.photo} alt={selected.name} className="h-full w-full object-cover" />
                  </dd>
                </div>
              )}
              <Detail label="Email" value={selected.email} />
              <Detail label="WhatsApp" value={selected.whatsapp} />
              <Detail label="Age" value={String(selected.age)} />
              <Detail label="Country" value={selected.country} />
              <Detail label="Major" value={selected.major} />
              <Detail label="Skill Level" value={getSkillLevelLabel(selected.skill_level)} />
              <Detail label="Course" value={getCourseLabel(selected.course_name)} />
              <Detail label="Why join" value={selected.why_join} />
              <Detail label="Expected outcomes" value={getOutcomeLabels(selected.expected_outcomes).join(", ")} />
              {selected.expected_outcomes_other && <Detail label="Other goal" value={selected.expected_outcomes_other} />}
              <Detail label="Heard about" value={labelFor(selected.hear_about, HEAR_ABOUT_OPTIONS)} />
              <Detail label="Payment" value={labelFor(selected.payment_method, PAYMENT_METHODS)} />
              <Detail label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
            </dl>

            <div className="mt-6 pt-4 border-t border-white/8">
              <label className="text-sm text-muted mb-2 block">Status</label>
              <AdminSelect
                value={selected.status}
                onChange={(status) => statusMutation.mutate({ id: selected.id, status })}
                options={statuses}
                dropUp
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted text-xs uppercase tracking-wide mb-1">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
