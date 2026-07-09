"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-shell";
import { fetchNewsletter } from "@/services/admin-api";

export default function AdminNewsletterPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-newsletter"],
    queryFn: fetchNewsletter,
  });

  const items = data?.data ?? data ?? [];

  return (
    <div>
      <AdminHeader title="Newsletter" description="Email subscribers list" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-[24px] p-6 border border-white/8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted">Total Subscribers</span>
          </div>
          <p className="text-3xl font-bold text-gradient">{Array.isArray(items) ? items.length : 0}</p>
        </div>
      </div>

      <div className="glass rounded-[24px] border border-white/8 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-muted text-left">
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(items) ? items : []).map((s: { id: number; email: string; created_at: string }) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 font-medium">{s.email}</td>
                    <td className="p-4 text-muted">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {!items?.length && (
                  <tr><td colSpan={2} className="p-12 text-center text-muted">No subscribers yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
