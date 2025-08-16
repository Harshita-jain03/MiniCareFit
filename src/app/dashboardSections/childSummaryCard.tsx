// // // src/app/dashboard/child/ChildHealthPage.tsx place it to whatever hirarchey u have
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import BaseTable from "../components/tables/basetable";

// // type FoodItem = {
// //   name: string;
// //   calories: number;
// // };

// // type ApiFoodLog = {
// //   id: number;
// //   quantity: number;
// //   meal_type: string;
// //   created_at: string;
// //   created_at_date?: string;
// //   created_at_time?: string;
// //   child: number;
// //   food_item: {
// //     id: number;
// //     name: string;
// //     calories: number;
// //     protein: number;
// //     fat: number;
// //     carbohydrate: number;
// //   };
// // };

// // type HealthSummary = {
// //   id: string;
// //   day: string;
// //   date: string;
// //   total_fat: number;
// //   total_protein: number;
// //   total_carbohydrate: number;
// //   total_calories: number;
// //   feedback: 'GOOD' | 'BAD';
// //   summary?: FoodItem[];
// // };

// // export default function ChildHealthPage() {
// //   const [data, setData] = useState<HealthSummary[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [balance] = useState(300);
// //   const [motivationIndex, setMotivationIndex] = useState(0);

// //   const motivations = [
// //     'Consistency is the key to success.',
// //     'Small steps every day lead to big results.',
// //     "Stay positive and keep moving forward.",
// //     "Believe in yourself—you've got this!",
// //     "Progress, not perfection.",
// //   ];

// //   const columns = [
// //     { headerName: 'Day', field: 'day' },
// //     { headerName: 'Date', field: 'date' },
// //     { headerName: 'Fat (g)', field: 'total_fat' },
// //     { headerName: 'Protein (g)', field: 'total_protein' },
// //     { headerName: 'Carbs (g)', field: 'total_carbohydrate' },
// //     { headerName: 'Calories', field: 'total_calories' },
// //     {
// //       headerName: 'Feedback',
// //       field: 'feedback',
// //       cellRenderer: (params: any) => (
// //         <span className={params.value === 'GOOD' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
// //           {params.value}
// //         </span>
// //       ),
// //     },
// //   ];

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setMotivationIndex((prev) => (prev + 1) % motivations.length);
// //     }, 4000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
// //         const res = await fetch('/api/child/dashboard', {
// //           headers: token ? { Authorization: `Bearer ${token}` } : {},
// //           cache: 'no-store',
// //         });
// //         if (!res.ok) throw new Error(`HTTP ${res.status}`);

// //         const items: ApiFoodLog[] = await res.json();

// //         // Build today's summary riw
// //         const todayISO = new Date().toISOString().slice(0, 10);
// //         const todays = items.filter(
// //           (i) => (i.created_at_date ?? i.created_at.slice(0, 10)) === todayISO
// //         );

// //         if (todays.length > 0) {
// //           const total_fat = todays.reduce(
// //             (sum, i) => sum + i.food_item.fat * (i.quantity ?? 1),
// //             0
// //           );
// //           const total_protein = todays.reduce(
// //             (sum, i) => sum + i.food_item.protein * (i.quantity ?? 1),
// //             0
// //           );
// //           const total_carbohydrate = todays.reduce(
// //             (sum, i) => sum + i.food_item.carbohydrate * (i.quantity ?? 1),
// //             0
// //           );
// //           const total_calories = todays.reduce(
// //             (sum, i) => sum + i.food_item.calories * (i.quantity ?? 1),
// //             0
// //           );

// //           const summary: HealthSummary = {
// //             id: new Date().toISOString(),
// //             day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
// //             date: todayISO,
// //             total_fat,
// //             total_protein,
// //             total_carbohydrate,
// //             total_calories,
// //             feedback: total_calories < 1800 ? 'GOOD' : 'BAD',
// //             summary: todays.map((i) => ({
// //               name: i.food_item.name,
// //               calories: i.food_item.calories * (i.quantity ?? 1),
// //             })),
// //           };

// //           setData([summary]);
// //         } else {
// //           setData([]);
// //         }
// //       } catch (err) {
// //         console.error('[ChildHealthPage] Fetch error:', err);
// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="p-6 space-y-6">
// //       {/* Top Summary Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
// //           <p className="text-sm text-gray-500">Total Balance</p>
// //           <p className="text-3xl font-bold text-blue-600">{balance}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow p-4 text-center">
// //           <p className="text-sm text-gray-500">Today's Progress</p>
// //           <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
// //             <div
// //               className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
// //               style={{ width: '60%' }}
// //             >
// //               60%
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center transition-all duration-1000">
// //           <p className="text-sm">⭐ Keep it up!</p>
// //           <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white rounded-lg shadow p-4">
// //         <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <BaseTable
// //             columns={columns}
// //             gridOptions={{
// //               rowData: data,
// //               localeText: { noRowsToShow: 'No health data found for this child.' },
// //             }}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// // src/app/dashboard/child/ChildHealthPage.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import BaseTable from "../components/tables/basetable";

// type FoodItem = {
//   name: string;
//   calories: number;
// };

// type ApiFoodLog = {
//   id: number;
//   quantity: number;
//   meal_type: string;
//   created_at: string;
//   created_at_date?: string;
//   created_at_time?: string;
//   child: number;
//   food_item: {
//     id: number;
//     name: string;
//     calories: number;
//     protein: number;
//     fat: number;
//     carbohydrate: number;
//   };
// };

// type HealthSummary = {
//   id: string;
//   day: string;
//   date: string;
//   total_fat: number;
//   total_protein: number;
//   total_carbohydrate: number;
//   total_calories: number;
//   feedback: 'GOOD' | 'BAD';
//   summary?: FoodItem[];
// };

// export default function ChildHealthPage() {
//   const [data, setData] = useState<HealthSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [balance] = useState(300);
//   const [motivationIndex, setMotivationIndex] = useState(0);

//   const motivations = [
//     'Consistency is the key to success.',
//     'Small steps every day lead to big results.',
//     "Stay positive and keep moving forward.",
//     "Believe in yourself—you've got this!",
//     "Progress, not perfection.",
//   ];

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
//       cellRenderer: (params: any) => (
//         <span className={params.value === 'GOOD' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
//           {params.value}
//         </span>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMotivationIndex((prev) => (prev + 1) % motivations.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // ⬇️ No Authorization header, no localStorage — cookies are sent automatically
//         const res = await fetch('/api/child/dashboard', { cache: 'no-store' });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);

//         const items: ApiFoodLog[] = await res.json();

//         // Build today's summary row
//         const todayISO = new Date().toISOString().slice(0, 10);
//         const todays = items.filter(
//           (i) => (i.created_at_date ?? i.created_at.slice(0, 10)) === todayISO
//         );

//         if (todays.length > 0) {
//           const total_fat = todays.reduce(
//             (sum, i) => sum + i.food_item.fat * (i.quantity ?? 1),
//             0
//           );
//           const total_protein = todays.reduce(
//             (sum, i) => sum + i.food_item.protein * (i.quantity ?? 1),
//             0
//           );
//           const total_carbohydrate = todays.reduce(
//             (sum, i) => sum + i.food_item.carbohydrate * (i.quantity ?? 1),
//             0
//           );
//           const total_calories = todays.reduce(
//             (sum, i) => sum + i.food_item.calories * (i.quantity ?? 1),
//             0
//           );

//           const summary: HealthSummary = {
//             id: new Date().toISOString(),
//             day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
//             date: todayISO,
//             total_fat,
//             total_protein,
//             total_carbohydrate,
//             total_calories,
//             feedback: total_calories < 1800 ? 'GOOD' : 'BAD',
//             summary: todays.map((i) => ({
//               name: i.food_item.name,
//               calories: i.food_item.calories * (i.quantity ?? 1),
//             })),
//           };

//           setData([summary]);
//         } else {
//           setData([]);
//         }
//       } catch (err) {
//         console.error('[ChildHealthPage] Fetch error:', err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Top Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
//           <p className="text-sm text-gray-500">Total Balance</p>
//           <p className="text-3xl font-bold text-blue-600">{balance}</p>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 text-center">
//           <p className="text-sm text-gray-500">Today's Progress</p>
//           <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
//             <div
//               className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
//               style={{ width: '60%' }}
//             >
//               60%
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center transition-all duration-1000">
//           <p className="text-sm">⭐ Keep it up!</p>
//           <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <BaseTable
//             columns={columns}
//             gridOptions={{
//               rowData: data,
//               localeText: { noRowsToShow: 'No health data found for this child.' },
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }



// src/app/dashboard/child/ChildHealthPage.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/** Props your BaseTable expects (keep this minimal to avoid touching basetable.tsx) */
type BaseTableProps = {
  columns: any[];
  gridOptions?: any;
};

/** Dynamic import that works with default OR named export, + proper typing */
const BaseTable = dynamic<BaseTableProps>(
  async () => {
    const mod: any = await import('../components/tables/basetable');
    const Comp = mod.default ?? mod.BaseTable ?? mod;
    return (Comp as unknown) as React.ComponentType<BaseTableProps>;
  },
  { ssr: false }
);

type FoodItem = { name: string; calories: number };

type ApiFoodLog = {
  id: number;
  quantity: number;
  meal_type: string;
  created_at: string;
  created_at_date?: string;
  created_at_time?: string;
  child: number;
  food_item: {
    id: number;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
  };
};

type HealthSummary = {
  id: string;
  day: string;
  date: string;
  total_fat: number;
  total_protein: number;
  total_carbohydrate: number;
  total_calories: number;
  feedback: 'GOOD' | 'BAD';
  summary?: FoodItem[];
};

export default function ChildHealthPage() {
  const [data, setData] = useState<HealthSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [balance] = useState(300);
  const [motivationIndex, setMotivationIndex] = useState(0);

  const motivations = [
    'Consistency is the key to success.',
    'Small steps every day lead to big results.',
    "Stay positive and keep moving forward.",
    "Believe in yourself—you've got this!",
    "Progress, not perfection.",
  ];

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
      cellRenderer: (params: any) => (
        <span className={params.value === 'GOOD' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
          {params.value}
        </span>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMotivationIndex((prev) => (prev + 1) % motivations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/child/dashboard', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items: ApiFoodLog[] = await res.json();

        // last 7 days aggregation (including today)
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - 6);

        const byDate: Record<string, ApiFoodLog[]> = {};
        for (const i of items) {
          const d = i.created_at_date ?? i.created_at.slice(0, 10);
          const dateObj = new Date(d + 'T00:00:00');
          if (dateObj >= new Date(start.toDateString())) {
            byDate[d] ??= [];
            byDate[d].push(i);
          }
        }

        const summaries: HealthSummary[] = Object.keys(byDate).map((dateKey) => {
          const logs = byDate[dateKey];
          const total_fat = logs.reduce((s, i) => s + i.food_item.fat * (i.quantity ?? 1), 0);
          const total_protein = logs.reduce((s, i) => s + i.food_item.protein * (i.quantity ?? 1), 0);
          const total_carbohydrate = logs.reduce((s, i) => s + i.food_item.carbohydrate * (i.quantity ?? 1), 0);
          const total_calories = logs.reduce((s, i) => s + i.food_item.calories * (i.quantity ?? 1), 0);
          const day = new Date(dateKey).toLocaleDateString('en-US', { weekday: 'short' });

          return {
            id: dateKey,
            day,
            date: dateKey,
            total_fat,
            total_protein,
            total_carbohydrate,
            total_calories,
            feedback: total_calories < 1800 ? 'GOOD' : 'BAD',
            summary: logs.map((i) => ({
              name: i.food_item.name,
              calories: i.food_item.calories * (i.quantity ?? 1),
            })),
          };
        });

        summaries.sort((a, b) => (a.date > b.date ? -1 : 1));
        setData(summaries);
      } catch (err) {
        console.error('[ChildHealthPage] Fetch error:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-3xl font-bold text-blue-600">{balance}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-gray-500">Today's Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div className="bg-green-500 h-4 rounded-full text-xs text-white text-center" style={{ width: '60%' }}>
              60%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center">
          <p className="text-sm">⭐ Keep it up!</p>
          <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BaseTable
            columns={columns}
            gridOptions={{
              rowData: data,
              localeText: { noRowsToShow: 'No health data for the last 7 days.' },
            }}
          />
        )}
      </div>
    </div>
  );
}
