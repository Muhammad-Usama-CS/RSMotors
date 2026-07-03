import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-secondary/30 dark:bg-black/20">
      <AdminSidebar adminName={session.name} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
