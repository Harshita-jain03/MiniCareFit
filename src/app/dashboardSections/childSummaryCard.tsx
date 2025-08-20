
// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import dynamic from 'next/dynamic';

// type BaseTableProps = { columns: any[]; gridOptions?: any };
// const BaseTable = dynamic<BaseTableProps>(
//   async () => {
//     const mod: any = await import('../components/tables/basetable');
//     return (mod.default ?? mod.BaseTable ?? mod) as React.ComponentType<BaseTableProps>;
//   },
//   { ssr: false }
// );

// type WeeklyRow = { date: string; day: string; fat_g: number; protein_g: number; carbs_g: number; calories: number };
// type WeeklyResp = { child: number; range: { from: string; to: string }; daily: WeeklyRow[]; totals: any };

// type ProgressResp = {
//   date: string;
//   child_id: number | null;
//   totals: { calories: number; protein_g: number; fat_g: number; carbs_g: number };
//   goals: { calories: number; protein_g: number; fat_g: number; carbs_g: number };
//   percent: { calories: number; protein_g: number; fat_g: number; carbs_g: number; meals_logged: number };
//   meals: { expected: number; logged: number; distinct_meals: string[] };
//   ui_hint: { zone: 'red' | 'amber' | 'green' };
// };

// type TableRow = {
//   id: string;
//   day: string;
//   date: string;
//   total_fat: number;
//   total_protein: number;
//   total_carbohydrate: number;
//   total_calories: number;
//   feedback: 'GOOD' | 'BAD';
// };

// // --- helpers (client-side only)
// function parseChildOverride(): number | null {
//   if (typeof window === 'undefined') return null;
//   const p = new URLSearchParams(window.location.search);
//   const v = p.get('child') || p.get('id');
//   return v ? Number(v) : null;
// }

// export default function ChildHealthPage() {
//   const [childId, setChildId] = useState<number | null>(null);
//   const [weekly, setWeekly] = useState<WeeklyResp | null>(null);
//   const [progress, setProgress] = useState<ProgressResp | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [balance] = useState(300);
//   const [motivationIndex, setMotivationIndex] = useState(0);
//   const [showDebug, setShowDebug] = useState(false);
//   const [status, setStatus] = useState<{ weekly?: number; progress?: number }>({});
//   const [urls, setUrls] = useState<{ weekly?: string; progress?: string }>({});

//   const motivations = [
//     'Consistency is the key to success.',
//     'Small steps every day lead to big results.',
//     'Stay positive and keep moving forward.',
//     "Believe in yourself—you've got this!",
//     'Progress, not perfection.',
//   ];

//   useEffect(() => {
//     const t = setInterval(() => setMotivationIndex((i) => (i + 1) % motivations.length), 4000);
//     return () => clearInterval(t);
//   }, []);

//   // Fetch via server proxy so cookies/JWT can be read server-side
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);

//         const override = parseChildOverride();
//         const url = override ? `/api/child/dashboard?child=${override}` : `/api/child/dashboard`;

//         const res = await fetch(url, { cache: 'no-store' });
//         const j = await res.json();

//         // both come from the proxy
//         setStatus({ weekly: res.status, progress: res.status });
//         setUrls({ weekly: 'via /api/child/dashboard', progress: 'via /api/child/dashboard' });

//         setChildId(j?.child_id ?? null);
//         setWeekly(j?.weekly ?? null);
//         setProgress(j?.progress ?? null);
//       } catch (e) {
//         console.error('[ChildDashboard] fetch error', e);
//         setWeekly(null);
//         setProgress(null);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const tableRows: TableRow[] = useMemo(() => {
//     const daily = weekly?.daily ?? [];
//     return daily.map((r) => ({
//       id: r.date,
//       day: r.day,
//       date: r.date,
//       total_fat: r.fat_g,
//       total_protein: r.protein_g,
//       total_carbohydrate: r.carbs_g,
//       total_calories: r.calories,
//       feedback: r.calories < 1800 ? 'GOOD' : 'BAD',
//     }));
//   }, [weekly]);

//   // ✅ fixed progressPercent calculation
//   const progressPercent = useMemo(() => {
//     if (!progress) return 0;

//     // Normalize: if API returns 0–1 fractions, convert to 0–100
//     const normalize = (v: number | undefined | null) =>
//       !isFinite(Number(v)) ? 0 : (Number(v) <= 1 ? Number(v) * 100 : Number(v));

//     const g = progress.goals || { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 };
//     const allZero =
//       (g.calories || 0) === 0 &&
//       (g.protein_g || 0) === 0 &&
//       (g.fat_g || 0) === 0 &&
//       (g.carbs_g || 0) === 0;

//     if (allZero) {
//       // Fallback: use calories vs a default target (change 2000 if you want)
//       const kcal = progress.totals?.calories || 0;
//       return Math.min(100, Math.round((kcal / 2000) * 100));
//     }

//     // Prefer calories % from API (normalized)
//     const pct = normalize(progress.percent?.calories);
//     return Math.max(0, Math.min(100, Math.round(pct)));
//   }, [progress]);

//   const progressColor =
//     progress?.ui_hint?.zone === 'green'
//       ? 'bg-green-500'
//       : progress?.ui_hint?.zone === 'amber'
//       ? 'bg-yellow-500'
//       : 'bg-red-500';

//   const columns = [
//     { headerName: 'Day', field: 'day' },
//     { headerName: 'Date', field: 'date' },
//     { headerName: 'Fat (g)', field: 'total_fat' },
//     { headerName: 'Protein (g)', field: 'total_protein' },
//     { headerName: 'Carbs (g)', field: 'total_carbohydrate' },
//     { headerName: 'Calories', field: 'total_calories' },
//     {
//       headerName: 'Feedback',
//       field: 'feedback',
//       cellRenderer: (p: any) => (
//         <span className={p.value === 'GOOD' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
//           {p.value}
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       {/* header with resolved child id */}
//       <div className="text-xs text-gray-600">
//         childId used: <b>{childId ?? 'not found'}</b>
//         <button className="ml-3 text-blue-600 underline" onClick={() => setShowDebug((s) => !s)}>
//           {showDebug ? 'Hide debug' : 'Show debug'}
//         </button>
//       </div>

//       {showDebug && (
//         <div className="p-3 mt-2 border rounded bg-gray-50 text-xs space-y-2">
//           <div>Weekly URL: <code>{urls.weekly}</code></div>
//           <div>Progress URL: <code>{urls.progress}</code></div>
//           <div>Status → weekly: <b>{status.weekly ?? '-'}</b> • progress: <b>{status.progress ?? '-'}</b></div>
//           <details>
//             <summary>Weekly JSON</summary>
//             <pre className="whitespace-pre-wrap break-words">{JSON.stringify(weekly, null, 2)}</pre>
//           </details>
//           <details>
//             <summary>Progress JSON</summary>
//             <pre className="whitespace-pre-wrap break-words">{JSON.stringify(progress, null, 2)}</pre>
//           </details>
//           <div className="text-[11px]">
//             Tip: add <code>?child=15</code> to the URL to test with a specific child id.
//           </div>
//         </div>
//       )}

//       {/* cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
//           <p className="text-sm text-gray-500">Total Balance</p>
//           <p className="text-3xl font-bold text-blue-600">{balance}</p>
//         </div>

//         {/* Progress card */}
//         <div className="bg-white rounded-lg shadow p-4 text-center">
//           <p className="text-sm text-gray-500">
//             Today's Progress {childId ? <span className="text-gray-400">• Child #{childId}</span> : null}
//           </p>
//           <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
//             <div
//               className={`${progressColor} h-4 rounded-full text-xs text-white text-center transition-all`}
//               style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
//             >
//               {Math.max(0, Math.min(100, progressPercent))}%
//             </div>
//           </div>
//           {progress && (
//             <div className="mt-2 text-xs text-gray-500">
//               kcal: {progress.totals.calories} • P:{progress.totals.protein_g}g • F:{progress.totals.fat_g}g • C:{progress.totals.carbs_g}g
//             </div>
//           )}
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center">
//           <p className="text-sm">⭐ Keep it up!</p>
//           <p className="font-semibold mt-1">
//             {motivations[motivationIndex]}
//           </p>
//         </div>
//       </div>

//       {/* Weekly table */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <BaseTable
//             columns={columns}
//             gridOptions={{
//               rowData: tableRows,
//               localeText: { noRowsToShow: childId ? 'No health data found for this child.' : 'No child id found.' },
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

type BaseTableProps = { columns: any[]; gridOptions?: any };
const BaseTable = dynamic<BaseTableProps>(
  async () => {
    const mod: any = await import('../components/tables/basetable');
    return (mod.default ?? mod.BaseTable ?? mod) as React.ComponentType<BaseTableProps>;
  },
  { ssr: false }
);

type WeeklyRow = { date: string; day: string; fat_g: number; protein_g: number; carbs_g: number; calories: number };
type WeeklyResp = { child: number; range: { from: string; to: string }; daily: WeeklyRow[]; totals: any };

type ProgressResp = {
  date: string;
  child_id: number | null;
  totals: { calories: number; protein_g: number; fat_g: number; carbs_g: number };
  goals: { calories: number; protein_g: number; fat_g: number; carbs_g: number };
  percent: { calories: number; protein_g: number; fat_g: number; carbs_g: number; meals_logged: number };
  meals: { expected: number; logged: number; distinct_meals: string[] };
  ui_hint: { zone: 'red' | 'amber' | 'green' };
};

type TableRow = {
  id: string;
  day: string;
  date: string;
  total_fat: number;
  total_protein: number;
  total_carbohydrate: number;
  total_calories: number;
  feedback: 'GOOD' | 'BAD';
};

// --- helpers (client-side only)
function parseChildOverride(): number | null {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);
  const v = p.get('child') || p.get('id');
  return v ? Number(v) : null;
}

export default function ChildHealthPage() {
  const [childId, setChildId] = useState<number | null>(null);
  const [weekly, setWeekly] = useState<WeeklyResp | null>(null);
  const [progress, setProgress] = useState<ProgressResp | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetched from /api/reward/balance (earned_points)
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [balanceStatus, setBalanceStatus] = useState<number | null>(null);

  const [motivationIndex, setMotivationIndex] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const [status, setStatus] = useState<{ weekly?: number; progress?: number }>({});
  const [urls, setUrls] = useState<{ weekly?: string; progress?: string; balance?: string }>({});

  const motivations = [
    'Consistency is the key to success.',
    'Small steps every day lead to big results.',
    'Stay positive and keep moving forward.',
    "Believe in yourself—you've got this!",
    'Progress, not perfection.',
  ];

  useEffect(() => {
    const t = setInterval(() => setMotivationIndex((i) => (i + 1) % motivations.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Fetch weekly+progress via server proxy so cookies/JWT can be read server-side
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const override = parseChildOverride();
        const url = override ? `/api/child/dashboard?child=${override}` : `/api/child/dashboard`;

        const res = await fetch(url, { cache: 'no-store' });
        const j = await res.json();

        // both come from the proxy
        setStatus({ weekly: res.status, progress: res.status });
        setUrls((u) => ({ ...u, weekly: 'via /api/child/dashboard', progress: 'via /api/child/dashboard' }));

        setChildId(j?.child_id ?? null);
        setWeekly(j?.weekly ?? null);
        setProgress(j?.progress ?? null);
      } catch (e) {
        console.error('[ChildDashboard] fetch error', e);
        setWeekly(null);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Fetch Total Balance (earned_points). If childId is present, filter for that child.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const qs = childId ? `?child=${childId}` : '';
        const res = await fetch(`/api/child/rewards/balance${qs}`, { cache: 'no-store' });
        setBalanceStatus(res.status);
        setUrls((u) => ({ ...u, balance: `/api/reward/balance${qs || ''}` }));

        const json = await res.json();

        const extractEarned = () => {
          if (Array.isArray(json)) {
            const targetId = childId ?? null;
            if (targetId != null) {
              const hit = json.find((row: any) => Number(row.user_id) === Number(targetId));
              if (hit) return Number(hit.earned_points || 0);
            }
            return json.length ? Number(json[0]?.earned_points || 0) : 0;
          }
          // object response
          return Number(json?.earned_points || 0);
        };

        const points = extractEarned();
        if (!cancelled) setTotalBalance(isFinite(points) ? points : 0);
      } catch (e) {
        console.error('[Balance] fetch error', e);
        if (!cancelled) {
          setTotalBalance(0);
          setBalanceStatus(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [childId]);

  const tableRows: TableRow[] = useMemo(() => {
    const daily = weekly?.daily ?? [];
    return daily.map((r) => ({
      id: r.date,
      day: r.day,
      date: r.date,
      total_fat: r.fat_g,
      total_protein: r.protein_g,
      total_carbohydrate: r.carbs_g,
      total_calories: r.calories,
      feedback: r.calories < 1800 ? 'GOOD' : 'BAD',
    }));
  }, [weekly]);

  // ✅ progressPercent calculation
  const progressPercent = useMemo(() => {
    if (!progress) return 0;

    const normalize = (v: number | undefined | null) =>
      !isFinite(Number(v)) ? 0 : (Number(v) <= 1 ? Number(v) * 100 : Number(v));

    const g = progress.goals || { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 };
    const allZero =
      (g.calories || 0) === 0 &&
      (g.protein_g || 0) === 0 &&
      (g.fat_g || 0) === 0 &&
      (g.carbs_g || 0) === 0;

    if (allZero) {
      const kcal = progress.totals?.calories || 0;
      return Math.min(100, Math.round((kcal / 2000) * 100));
    }

    const pct = normalize(progress.percent?.calories);
    return Math.max(0, Math.min(100, Math.round(pct)));
  }, [progress]);

  const progressColor =
    progress?.ui_hint?.zone === 'green'
      ? 'bg-green-500'
      : progress?.ui_hint?.zone === 'amber'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  const columns = [
    { headerName: 'Day', field: 'day' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Fat (g)', field: 'total_fat' },
    { headerName: 'Protein (g)', field: 'total_protein' },
    { headerName: 'Carbs (g)', field: 'total_carbohydrate' },
    { headerName: 'Calories', field: 'total_calories' },
    {
      headerName: 'Feedback',
      field: 'feedback',
      cellRenderer: (p: any) => (
        <span className={p.value === 'GOOD' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
          {p.value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* header with resolved child id */}
      <div className="text-xs text-gray-600">
        childId used: <b>{childId ?? 'not found'}</b>
        
      </div>

      {showDebug && (
        <div className="p-3 mt-2 border rounded bg-gray-50 text-xs space-y-2">
          <div>Weekly URL: <code>{urls.weekly}</code></div>
          <div>Progress URL: <code>{urls.progress}</code></div>
          <div>Balance URL: <code>{urls.balance}</code></div>
          <div>Status → weekly: <b>{status.weekly ?? '-'}</b> • progress: <b>{status.progress ?? '-'}</b> • balance: <b>{balanceStatus ?? '-'}</b></div>
          <details>
            <summary>Weekly JSON</summary>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(weekly, null, 2)}</pre>
          </details>
          <details>
            <summary>Progress JSON</summary>
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(progress, null, 2)}</pre>
          </details>
          <div className="text-[11px]">
            Tip: add <code>?child=15</code> to the URL to test with a specific child id.
          </div>
        </div>
      )}

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ✅ Total Balance (earned_points) */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
          <p className="text-sm text-gray-500">Total Balance (Earned Points)</p>
          <p className="text-3xl font-bold text-blue-600">
            {totalBalance ?? '—'}
          </p>
        </div>

        {/* Progress card */}
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-gray-500">
            Today's Progress {childId ? <span className="text-gray-400">• Child #{childId}</span> : null}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className={`${progressColor} h-4 rounded-full text-xs text-white text-center transition-all`}
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            >
              {Math.max(0, Math.min(100, progressPercent))}%
            </div>
          </div>
          {progress && (
            <div className="mt-2 text-xs text-gray-500">
              kcal: {progress.totals.calories} • P:{progress.totals.protein_g}g • F:{progress.totals.fat_g}g • C:{progress.totals.carbs_g}g
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center">
          <p className="text-sm">⭐ Keep it up!</p>
          <p className="font-semibold mt-1">
            {motivations[motivationIndex]}
          </p>
        </div>
      </div>

      {/* Weekly table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BaseTable
            columns={columns}
            gridOptions={{
              rowData: tableRows,
              localeText: { noRowsToShow: childId ? 'No health data found for this child.' : 'No child id found.' },
            }}
          />
        )}
      </div>
    </div>
  );
}
