"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/admin-shell";
import { AdminSelect } from "@/components/admin/admin-select";
import { fetchContacts, updateContactStatus } from "@/services/admin-api";

const statuses = ["new", "read", "replied", "archived"] as const;

export default function AdminContactsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: () => fetchContacts(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const items = data?.data ?? [];

  return (
    <div>
      <AdminHeader title="Contacts" description="Manage contact form submissions" />

      <div className="glass rounded-[24px] border border-white/8 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-muted text-left">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium hidden md:table-cell">Email</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Subject</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c: {
                  id: number; name: string; email: string; subject?: string;
                  message?: string; status: string; created_at: string;
                }) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted md:hidden">{c.email}</p>
                      {c.message && <p className="text-xs text-muted mt-1 max-w-xs truncate">{c.message}</p>}
                    </td>
                    <td className="p-4 text-muted hidden md:table-cell">{c.email}</td>
                    <td className="p-4 text-muted hidden lg:table-cell">{c.subject ?? "—"}</td>
                    <td className="p-4">
                      <AdminSelect
                        size="sm"
                        value={c.status}
                        onChange={(status) => statusMutation.mutate({ id: c.id, status })}
                        options={statuses}
                        className="w-auto min-w-[110px]"
                      />
                    </td>
                    <td className="p-4 text-muted text-xs hidden md:table-cell">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {!items.length && (
                  <tr><td colSpan={5} className="p-12 text-center text-muted">No contacts yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
