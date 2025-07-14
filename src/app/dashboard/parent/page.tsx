
import SummaryCard from "../../dashboardSections/parentSummaryCard"; // adjust path if needed
import { UserIcon } from "lucide-react"; // or any icon you prefer

export default function ParentDashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Total Students"
        value={"42"} // OR value={42.toString()}
        icon="👨‍🎓"
        color="blue"
        />


    </div>
  );
}
