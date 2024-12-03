'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { DataTableExport } from './data-table-export';
import { DataTableSkeleton } from './data-table-skeleton';
import { useSidebar } from '../ui/sidebar';

interface ReusableDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  queryKey: string | string[] | (string | number)[];
  fetchData: () => Promise<TData[]>;
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  filterableColumns?: {
    id: string;
    title: string;
    options: { label: string; value: string }[];
  }[];
  rangeFilterColumns?: {
    id: string;
    title: string;
    min: number;
    max: number;
  }[];
  defaultSort?: { id: string; desc: boolean };
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  enableExport?: boolean;
  paginationSizes?: number[];
  skeletonConfig?: {
    rowCount?: number;
    showToolbar?: boolean;
    showPagination?: boolean;
    showColumnHeaders?: boolean;
    showFooter?: boolean;
    cellWidths?: string[];
  };
}

const dateRangeFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId) as Date;
  const [start, end] = value as [Date, Date];

  if (!start || !end) return true;

  return cellValue >= start && cellValue <= end;
};

export function ReusableDataTable<TData>({
  columns,
  queryKey,
  fetchData,
  searchableColumns = [],
  filterableColumns = [],
  rangeFilterColumns = [],
  defaultSort,
  enableRowSelection = false,
  enableColumnVisibility = true,
  enablePagination = true,
  enableExport = true,
  paginationSizes = [10, 20, 30, 40, 50],
  skeletonConfig = {
    rowCount: 5,
    showToolbar: true,
    showPagination: true,
    showColumnHeaders: true,
    showFooter: false,
    cellWidths: ['auto'],
  },
}: ReusableDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(
    defaultSort ? [defaultSort] : []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { state } = useSidebar();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
  });
  console.log(data, isLoading, isError);
  const visibleColumns = React.useMemo(
    () => columns.filter((col) => !(col.enableHiding ?? false)),
    [columns]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    enableSorting: true,
    enableFilters: true,
    enableGlobalFilter: true,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === 'object' && value !== null) {
        if (value instanceof Date) {
          return value.toISOString().includes(String(filterValue));
        }
        return Object.values(value).some((v) =>
          String(v).toLowerCase().includes(String(filterValue).toLowerCase())
        );
      }
      return String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
    filterFns: {
      dateRange: dateRangeFilter,
    },
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={visibleColumns.length}
        rowCount={skeletonConfig.rowCount || 5}
        showToolbar={skeletonConfig.showToolbar}
        withPagination={skeletonConfig.showPagination}
        cellWidths={skeletonConfig.cellWidths}
        showFooter={skeletonConfig.showFooter}
        searchableColumnCount={searchableColumns.length}
        filterableColumnCount={filterableColumns.length}
      />
    );
  }

  if (isError) return <div>Error fetching data</div>;

  return (
    <div
      className={`w-full ${
        state === 'expanded' ? 'max-w-[75vw]' : 'max-w-[85vw]'
      } space-y-4`}
    >
      {data && (
        <div className="flex items-end justify-end gap-2">
          <DataTableToolbar
            table={table}
            searchableColumns={searchableColumns}
            filterableColumns={filterableColumns}
            rangeFilterColumns={rangeFilterColumns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {enableExport && <DataTableExport table={table} />}
        </div>
      )}

      <div
        className={`w-full ${
          state === 'expanded' ? 'max-w-[75vw]' : 'max-w-[85vw]'
        }`}
      >
        <div className="w-full border rounded-md">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const column = header.column.columnDef;
                        if (column.enableHiding) return null;
                        return (
                          <TableHead
                            key={header.id}
                            className="whitespace-nowrap"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const column = cell.column.columnDef;
                          if (column.enableHiding) return null;
                          return (
                            <TableCell
                              key={cell.id}
                              className="whitespace-nowrap"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={visibleColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {enablePagination && (
        <DataTablePagination table={table} paginationSizes={paginationSizes} />
      )}
    </div>
  );
}
