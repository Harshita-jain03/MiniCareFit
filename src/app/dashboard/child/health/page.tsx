import Link from "next/link";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import FoodLogsTable from "./foodTable"; // make sure the filename really is foodTable.tsx (or adjust)

type JwtPayload = {
  user_id: number;
  role?: string;
  child_id?: number;
  child?: { id: number };
};

export default async function HealthPage() {
  // Some projects type cookies() as sync, some as async.
  // This works in both cases without TS errors.
  let token: string | undefined;

  try {
    // try sync usage
    // @ts-expect-error - in some Next versions this is sync
    token = cookies().get("token")?.value;
  } catch {
    // fallback to awaited usage
  
    const c = await cookies();
    token = c.get("token")?.value;
  }

  let childId: number | null = null;

  if (token) {
    try {
      const payload = jwtDecode<JwtPayload>(token);
      const role = (payload.role || "").toLowerCase();
      childId =
        payload.child_id ??
        payload.child?.id ??
        (role === "child" || role === "student" ? payload.user_id : null);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
    }
  }

  if (!childId) {
    return <div className="p-6">No child id found in token.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-600">🩺 Health Dashboard</h2>

        {/* ➕ Add Food button */}
        <Link
          href="/dashboard/child/health/food-form"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Add Food
        </Link>
      </div>

      {/* Food logs table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">📋 Food Logs</h3>
        <FoodLogsTable childId={childId} />
      </div>
    </div>
  );
}
