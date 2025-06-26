// src/app/dashboard/admin/layout.tsx
import AppHeader from "../../_container/AppHeader";
import AdminSidebar from "../../sidebars/admin/main";
import AdminDashboardPage from "../../sidebars/admin/dashboard";
import SummaryCard from "../../components/sidebar/admin/summaryCard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader role="Admin" />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
      <div>
        <AdminDashboardPage/>
      </div>
      

    </div>
  );
}
