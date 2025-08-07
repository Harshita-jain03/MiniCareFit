'use client';

import {
  AgGridReact,
} from 'ag-grid-react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  CheckboxEditorModule,
  ClientSideRowModelModule,
  CsvExportModule,
  CustomEditorModule,
  CustomFilterModule,
  DateFilterModule,
  NumberEditorModule,
  NumberFilterModule,
  RowAutoHeightModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule
} from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import type { ColDef, SortModelItem } from 'ag-grid-community';
import debounce from 'lodash.debounce';
import React from 'react';
import AsyncSelectFilter from './asyncFilterDropdown';
import { DropdownFilter, SearchField } from './tableTypes';



type BaseTableProps = {
  columns: ColDef[];
  endpoint?: string;
  searchFields?: SearchField[];
  dropdownFilters?: DropdownFilter[];
  onCellValueChanged?: (params: any) => void;
  gridOptions?: any;
  autoRefresh?: boolean;
  baseQuery?: Record<string, any>;
  asyncFilters?: {
    name: string;
    label: string;
    loadOptionsUrl: string;
    searchKey?: string;
    labelKey?: string;
    valueKey?: string;
  }[];
  
};


const BaseTable = forwardRef(({
  columns,
  endpoint,
  searchFields = [],
  dropdownFilters = [],
  baseQuery,
  onCellValueChanged,
  gridOptions = {},
  autoRefresh = false,
  asyncFilters,
}: BaseTableProps, ref) => {

    useImperativeHandle(ref, () => ({
        refetch: fetchData
      }));
     
    
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortModel, setSortModel] = useState<SortModelItem[] | null>(null);
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({});
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams({
      page: currentPage.toString(),
      page_size: pageSize.toString(),
      ...baseQuery,
    });

    Object.entries(searchValues).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    if (sortModel && sortModel.length > 0) {
      const sort = sortModel[0];
      query.append('ordering', sort.sort === 'desc' ? `-${sort.colId}` : sort.colId);
    }

    try {
      if(endpoint){

      
      const response = await fetch(`${endpoint}?${query.toString()}`);
      const data = await response.json();
      setRowData(data.results || []);
      setTotalCount(data.count || 0);
      }
      else {
        const data = gridOptions.rowData;
        setRowData(data);
        setTotalCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, currentPage, pageSize, searchValues, filterValues, sortModel, gridOptions.rowData]);

  useEffect(() => {
    
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchData, 60 * 1000); // every 2 mins
    return () => clearInterval(interval);
  }, [fetchData, autoRefresh]);

  const handleSearchChange = (key: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const debouncedSearchChange = useMemo(() => {
    return debounce(handleSearchChange, 400);
  }, []);

  const handleDropdownChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const onSortChanged = () => {
    const model = (gridRef.current?.api as any)?.getSortModel?.();
    setSortModel(model || []);
  };

  const onExportCSV = () => {
    gridRef.current?.api.exportDataAsCsv();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {searchFields.map((field) => (
          <input
            key={field.key}
            type="text"
            placeholder={field.placeholder}
            className="border px-2 py-1 rounded text-black"
            defaultValue={searchValues[field.key] || ''}
            onChange={(e) => debouncedSearchChange(field.key, e.target.value)}
          />
        ))}

        {dropdownFilters.map((filter) => (
          <select
            key={filter.key}
            className="border px-2 py-1 rounded text-black"
            value={filterValues[filter.key] || ''}
            onChange={(e) => handleDropdownChange(filter.key, e.target.value)}
          >
            <option value="">All {filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {asyncFilters?.map((filter:any) => (
          <AsyncSelectFilter
            key={filter.name}
            name={filter.name}
            label={filter.label}
            loadOptionsUrl={filter.loadOptionsUrl}
            value={filterValues[filter.name]}
            onChange={handleDropdownChange}
            searchKey={filter.searchKey}
            labelKey={filter.labelKey}
            valueKey={filter.valueKey}
          />
        ))}


        <button onClick={onExportCSV} className="bg-blue-600 text-white px-4 py-1 rounded">
          Export CSV
        </button>

        <select
          className="border rounded px-2 py-1 ml-2 text-black"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-10 rounded w-full"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact
              theme="legacy"
              ref={gridRef}
              defaultColDef={{
                 flex: 1,
                  minWidth: 150, // or any pixel width you like
                  resizable: true, // if you want users to resize columns
                }}
              gridOptions={gridOptions}
              columnDefs={columns}
              rowData={rowData}
              onCellValueChanged={onCellValueChanged}
              modules={[
                ClientSideRowModelModule,
                CsvExportModule,
                ValidationModule,
                TextFilterModule,
                NumberFilterModule,
                DateFilterModule,
                CustomFilterModule,
                RowAutoHeightModule,
                CustomEditorModule,
                TextEditorModule,
                CheckboxEditorModule,
                NumberEditorModule
              ]}
              domLayout="autoHeight"
              suppressPaginationPanel={true}
              suppressScrollOnNewData={true}
              onSortChanged={onSortChanged}
              pagination={false}
              getRowId={(params) => params.data.id}
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-blue-500 rounded disabled text-black"
            >
              Previous
            </button>

            <span className="px-3 py-1 text-sm bg-blue rounded text-black">
              Page {currentPage} of {Math.max(1, Math.ceil(totalCount / pageSize))}
            </span>

            <button
              disabled={currentPage >= Math.ceil(totalCount / pageSize)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-blue-500 rounded disabled text-black"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    );
});

export default React.memo(BaseTable);
