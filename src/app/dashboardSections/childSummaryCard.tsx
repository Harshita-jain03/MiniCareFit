'use client';

import { useEffect, useState } from 'react';
import BaseTable from "../components/tables/basetable";

type FoodItem = {
  name: string;
  calories: number;
};

type RawFoodItem = {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
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
  const [balance, setBalance] = useState(300);
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
        const res = await fetch('/api/child/food-summary?id=9'); // replace with dynamic child ID
        const items: RawFoodItem[] = await res.json();

        if (Array.isArray(items) && items.length > 0) {
          const today = new Date();
          const summary: HealthSummary = {
            id: today.toISOString(),
            day: today.toLocaleDateString('en-US', { weekday: 'short' }),
            date: today.toISOString().split('T')[0],
            total_fat: items.reduce((sum, i) => sum + i.fat, 0),
            total_protein: items.reduce((sum, i) => sum + i.protein, 0),
            total_carbohydrate: items.reduce((sum, i) => sum + i.carbohydrate, 0),
            total_calories: items.reduce((sum, i) => sum + i.calories, 0),
            feedback: items.reduce((sum, i) => sum + i.calories, 0) < 1800 ? 'GOOD' : 'BAD',
            summary: items.map((i) => ({ name: i.name, calories: i.calories })),
          };

          setData([summary]);
        } else {
          setData([]); // still render table
        }
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
      {/* ✅ Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-3xl font-bold text-blue-600">{balance}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-sm text-gray-500">Today's Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
              style={{ width: '60%' }}
            >
              60%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-4 text-white text-center transition-all duration-1000">
          <p className="text-sm">⭐ Keep it up!</p>
          <p className="font-semibold mt-1">{motivations[motivationIndex]}</p>
        </div>
      </div>

      {/* ✅ Table (always render) */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg text-blue-600 font-semibold mb-3">Weekly Health Summary</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <BaseTable
            columns={columns}
            gridOptions={{
              rowData: data,
              localeText: {
                noRowsToShow: 'No health data found for this child.',
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
