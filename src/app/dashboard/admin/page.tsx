// src/app/dashboard/admin/page.tsx

import SummaryCard from "../../dashboardSections/adminSummaryCard";// adjust path if no alias

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCard />
      


      {/* You can add more components here */}
      {/* <StatsCard /> */}
      {/* <RecentActivity /> */}
    </div>
  );
}
