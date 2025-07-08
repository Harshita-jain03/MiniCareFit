import AppHeader from "../../_container/AppHeader";
import AdminSidebar from "../../components/sidebar/adminSidebar";// adjust path if needed

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader role="Admin" />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
      
    </div>
  );
}
