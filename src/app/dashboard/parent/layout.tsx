// // src/app/dashboard/admin/layout.tsx
// import AppHeader from "../../_container/AppHeader";
// import  ParentSidebar from "../../components/sidebar/parentSidebar";
// // import AdminDashboardPage from "../../sidebars/admin/dashboard";
// // import AdminDashboardPage from "./page";

// export default function ParentLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen">
//       <AppHeader role="Child" />
//       <div className="flex">
//         < ParentSidebar />
//         <main className="flex-1 p-6 bg-white">{children}</main>
//       </div>
//       <div>
//         {/* <AdminDashboardPage/> */}
//       </div>
      

//     </div>
//   );
// }


// src/app/dashboard/parent/layout.tsx
// src/app/dashboard/parent/layout.tsx
import AppHeader from "../../_container/AppHeader";
import ParentSidebar from "../../components/sidebar/parentSidebar";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader role="Parent" />
      <div className="flex">
        <ParentSidebar/>
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
