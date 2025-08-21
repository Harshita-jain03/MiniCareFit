// src/app/api/parent/dashboard/week-summary/route.ts
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "@/src/lib/api";
import {
  fetchWithTokenRetry,
  decodeTokenFromRequest,
} from "@/src/lib/auth/server";

// Types (match your backend)
type DayRow = { date: string; day: string; tasks_completed: number; rewards: number; calories: number; };
type Points = { earned_all_time: number; spent_all_time: number; balance: number; earned_this_week: number; };
type ChildSummary = {
  child: { id: number; name: string };
  range: { from_?: string; to: string };
  daily: DayRow[];
  totals: { tasks_completed: number; rewards: number; calories: number };
  points: Points;
};
type WeeklyData = {
  range: { from: string; to: string };
  count: number;
  summaries: ChildSummary[];
};

export async function GET(req: NextRequest) {
  try {
    // 1) Who is logged in?
    const payload = decodeTokenFromRequest(req);
    const parentId = payload?.user_id;
    if (!parentId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Get parent-child mappings
    const { data: mappings, status: mapStatus } = await fetchWithTokenRetry(
      API_URLS.PARENT_CHILD_MAPPING.GET_ALL,
      { method: "GET" }
    );
    if (mapStatus >= 400) {
      return NextResponse.json({ error: "Failed to load mappings" }, { status: mapStatus });
    }

    // 3) Find child id(s) for this parent
    const childIds: number[] = Array.isArray(mappings)
      ? mappings.filter((m: any) => Number(m?.parent) === Number(parentId)).map((m: any) => Number(m?.child))
      : [];

    if (childIds.length === 0) {
      return NextResponse.json(
        { range: null, child: null, summary: null, message: "No child mapped to this parent" },
        { status: 200 }
      );
    }

    // If multiple children are mapped, you can pick one or return all.
    // For now, pick the first mapped child.
    const childId = childIds[0];

    // 4) Prefer the per-child endpoint if supported: /users/reports/child-week-summary/?child=ID
    const url = `${API_URLS.REPORTS.CHILD_WEEK_SUMMARY}?child=${encodeURIComponent(childId)}`;
    const { data: oneChildSummary, status: oneStatus } = await fetchWithTokenRetry(url, { method: "GET" });

    if (oneStatus < 400 && oneChildSummary) {
      // Return a normalized shape for the page
      return NextResponse.json(
        {
          child: oneChildSummary?.child || null,
          range: oneChildSummary?.range || null,
          daily: oneChildSummary?.daily || [],
          totals: oneChildSummary?.totals || { tasks_completed: 0, rewards: 0, calories: 0 },
          points: oneChildSummary?.points || { earned_all_time: 0, spent_all_time: 0, balance: 0, earned_this_week: 0 },
        },
        { status: 200 }
      );
    }

    // 5) Fallback: use children-week-summary and filter
    const { data: kidsWeekly, status: kidsStatus } = await fetchWithTokenRetry(
      API_URLS.REPORTS.CHILDREN_WEEK_SUMMARY,
      { method: "GET" }
    );
    if (kidsStatus >= 400 || !kidsWeekly) {
      return NextResponse.json({ error: "Failed to load weekly summary" }, { status: kidsStatus || 500 });
    }

    const match: ChildSummary | undefined = (kidsWeekly?.summaries || []).find(
      (s: ChildSummary) => Number(s?.child?.id) === Number(childId)
    );

    if (!match) {
      return NextResponse.json(
        { child: { id: childId, name: "" }, range: kidsWeekly?.range || null, daily: [], totals: { tasks_completed: 0, rewards: 0, calories: 0 }, points: { earned_all_time: 0, spent_all_time: 0, balance: 0, earned_this_week: 0 } },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        child: match.child,
        range: match.range || kidsWeekly?.range || null,
        daily: match.daily || [],
        totals: match.totals || { tasks_completed: 0, rewards: 0, calories: 0 },
        points: match.points || { earned_all_time: 0, spent_all_time: 0, balance: 0, earned_this_week: 0 },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[week-summary] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
