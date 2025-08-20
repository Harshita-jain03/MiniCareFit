
// src/app/dashboard/admin/SummaryCard.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { ClientSideRowModelModule, CsvExportModule } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

type Row = {
  user_id: number;
  name: string;
  profile_pic?: string | null;
  completed_tasks: number;
  pending_tasks: number;
  total_tasks: number;
  earned_points: number;
  spent_points: number;
  balance: number;
  rank: number;
};

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL || 'http://localhost:8000/media/';

export default function SummaryCard() {          // <-- default export
  const gridRef = useRef<AgGridReact<Row>>(null);

  const [rows, setRows] = useState<Row[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const columns: ColDef<Row>[] = useMemo(
    () => [
      {
        headerName: 'Profile Pic',
        field: 'profile_pic',
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: (p: any) => {
          const url = p.value ? `${MEDIA_BASE}${p.value}` : '';
          if (!url) return null;
          return (
            <img
              src={url}
              alt="avatar"
              style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
            />
          );
        },
      },
      { headerName: 'Name', field: 'name', sortable: true },
      { headerName: 'Completed', field: 'completed_tasks', sortable: true },
      { headerName: 'Pending', field: 'pending_tasks', sortable: true },
      { headerName: 'Tasks', field: 'total_tasks', sortable: true },
      { headerName: 'Points', field: 'balance', sortable: true },
      { headerName: 'Rank', field: 'rank', sortable: true },
    ],
    []
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const qs = new URLSearchParams({ page: String(page), page_size: String(pageSize) });

      const res = await fetch(`/api/admin/dashboard?${qs.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();

      setRows(data?.results ?? []);
      setCount(data?.count ?? 0);
    } catch (e) {
      console.error('Failed to load summary:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const onExportCSV = () => {
    gridRef.current?.api.exportDataAsCsv({
      processCellCallback: (params) => {
        if (params.column.getColId() === 'profile_pic') {
          const v = params.value ? `${MEDIA_BASE}${params.value}` : '';
          return v;
        }
        return params.value;
      },
    });
  };

  return (
    <div className="bg-grey shadow-xl rounded-2xl p-6 w-full max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">SUMMARY</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:scale-105 transition-all"
          >
            Export CSV
          </button>

          <select
            className="border rounded px-2 py-2 text-black"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-10 rounded w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact<Row>
              ref={gridRef}
              columnDefs={columns}
              rowData={rows}
              defaultColDef={{ flex: 1, minWidth: 140, resizable: true }}
              modules={[ClientSideRowModelModule, CsvExportModule]}
              domLayout="autoHeight"
              suppressPaginationPanel
              suppressScrollOnNewData
              pagination={false}
              getRowId={(p) => String(p.data.user_id)}
              getRowHeight={() => 60}
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 bg-blue-500 rounded text-white disabled:opacity-50"
            >
              Previous
            </button>

          <span className="px-3 py-1 text-sm bg-blue-100 rounded text-blue-800">
              Page {page} of {Math.max(1, Math.ceil(count / pageSize))}
            </span>

            <button
              disabled={page >= Math.ceil(count / pageSize)}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-blue-500 rounded text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
