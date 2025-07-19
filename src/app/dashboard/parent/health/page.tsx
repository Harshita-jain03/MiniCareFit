"use client";

import HealthPlanForm from "./health-paln-form";
import ChildDailyHealthLog from "./health-log";

export default function HealthDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🏥 Child Health Dashboard</h1>

      {/* Section: Parent's Health Plan Input */}
      <div className="bg-white p-4 rounded shadow">
        <HealthPlanForm />
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Section: Child Daily Log */}
      <div className="bg-white p-4 rounded shadow">
        <ChildDailyHealthLog />
      </div>
    </div>
  );
}
