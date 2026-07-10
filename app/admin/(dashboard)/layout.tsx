import { AdminAuthGuard } from "@/components/admin/admin-shell";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#09090b] text-foreground">
        <AdminSidebar />
        <main className="ml-64 min-h-screen p-6 md:p-8 admin-scroll transition-all max-w-[1600px]">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
