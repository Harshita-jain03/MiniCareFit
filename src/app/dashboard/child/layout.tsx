// src/app/dashboard/admin/layout.tsx
import AppHeader from "../../_container/AppHeader";
import ChildSidebar from "../../components/sidebar/childSidebar";
// import AdminDashboardPage from "../../sidebars/admin/dashboard";
// import AdminDashboardPage from "./page";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader role="Child" />
      <div className="flex">
        <ChildSidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
      <div>
        {/* <AdminDashboardPage/> */}
      </div>
      

    </div>
  );
}
