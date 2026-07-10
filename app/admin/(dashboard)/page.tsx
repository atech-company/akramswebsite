"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BookOpen, Package, Layers, FileText, Mail, MessageSquare,
  Users, TrendingUp, Eye, ClipboardList,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { AdminHeader } from "@/components/admin/admin-shell";
import { fetchDashboard } from "@/services/admin-api";
import { cn } from "@/lib/utils";

const chartData = [
  { month: "Jan", students: 45, projects: 8 },
  { month: "Feb", students: 62, projects: 12 },
  { month: "Mar", students: 78, projects: 15 },
  { month: "Apr", students: 95, projects: 18 },
  { month: "May", students: 120, projects: 22 },
  { month: "Jun", students: 145, projects: 28 },
];

function StatCard({ label, value, icon: Icon, trend, color }: {
  label: string; value: number | string; icon: React.ElementType; trend?: string; color?: string;
}) {
  return (
    <div className="glass rounded-[24px] p-6 hover:border-primary/20 border border-white/8 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", color || "bg-primary/15 border border-primary/20")}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs text-primary">
            <TrendingUp className="h-3 w-3" />{trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gradient">{value}</p>
      <p className="text-sm text-muted mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-dashboard"], queryFn: fetchDashboard });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const stats = data?.stats ?? {};

  return (
    <div>
      <AdminHeader title="Dashboard" description="Overview of your AkramsLab platform" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Courses" value={stats.courses ?? 0} icon={BookOpen} trend="+12%" />
        <StatCard label="Products" value={stats.products ?? 0} icon={Package} />
        <StatCard label="Portfolio" value={stats.portfolio ?? 0} icon={Layers} />
        <StatCard label="Blog Posts" value={stats.blog_posts ?? 0} icon={FileText} />
        <StatCard label="New Contacts" value={stats.contacts_new ?? 0} icon={MessageSquare} color="bg-amber-500/15 border-amber-500/20" />
        <StatCard label="Registrations" value={stats.registrations ?? 0} icon={ClipboardList} />
        <StatCard label="New Registrations" value={stats.registrations_new ?? 0} icon={ClipboardList} color="bg-emerald-500/15 border-emerald-500/20" />
        <StatCard label="Subscribers" value={stats.subscribers ?? 0} icon={Mail} />
        <StatCard label="Team Members" value={stats.team ?? 0} icon={Users} />
        <StatCard label="Published Courses" value={data?.published?.courses ?? 0} icon={Eye} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-[24px] p-6 border border-white/8">
          <h3 className="font-semibold mb-6">Growth Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="url(#blueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-[24px] p-6 border border-white/8">
          <h3 className="font-semibold mb-6">Projects Delivered</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="projects" fill="#818cf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass rounded-[24px] p-6 border border-white/8">
          <h3 className="font-semibold mb-4">Recent Contacts</h3>
          <div className="space-y-3">
            {(data?.recent_contacts ?? []).map((c: { id: number; name: string; email: string; subject?: string; status: string }) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted">{c.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary capitalize">{c.status}</span>
              </div>
            ))}
            {!(data?.recent_contacts?.length) && <p className="text-muted text-sm">No contacts yet</p>}
          </div>
        </div>

        <div className="glass rounded-[24px] p-6 border border-white/8">
          <h3 className="font-semibold mb-4">Recent Registrations</h3>
          <div className="space-y-3">
            {(data?.recent_registrations ?? []).map((r: { id: number; name: string; course_name: string; created_at: string }) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                <div>
                  <p className="font-medium text-sm">{r.name}</p>
                  <p className="text-xs text-muted truncate max-w-[180px]">{r.course_name.replace(/_/g, " ")}</p>
                </div>
                <p className="text-xs text-muted">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {!(data?.recent_registrations?.length) && <p className="text-muted text-sm">No registrations yet</p>}
          </div>
        </div>

        <div className="glass rounded-[24px] p-6 border border-white/8">
          <h3 className="font-semibold mb-4">Recent Subscribers</h3>
          <div className="space-y-3">
            {(data?.recent_subscribers ?? []).map((s: { id: number; email: string; created_at: string }) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                <p className="text-sm">{s.email}</p>
                <p className="text-xs text-muted">{new Date(s.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {!(data?.recent_subscribers?.length) && <p className="text-muted text-sm">No subscribers yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
