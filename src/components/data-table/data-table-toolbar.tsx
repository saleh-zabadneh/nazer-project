import React from 'react';
import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableRangeFilter } from './data-table-range-filter';
import { DateTimeRangeFilter } from '../ui/date-time-range';
import { YearMonthPicker } from '../ui/date-year-month-picker';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns: {
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
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchableColumns,
  filterableColumns = [],
  rangeFilterColumns = [],
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || globalFilter !== '';

  return (
    <div className="flex flex-col flex-wrap justify-between w-full max-w-full gap-2 ">
      {searchableColumns.length > 0 && (
        <div className="relative flex-grow">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${searchableColumns.map((column) => column.title).join(', ')}...`}
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full max-w-lg py-2 pl-8 pr-4 outline-primary outline-1"
          />
        </div>
      )}
      <div className="flex flex-wrap items-center flex-1 gap-2">
        {filterableColumns.map(({ id, title, options }) => {
          const column = table.getColumn(id);
          return (
            column && (
              <React.Fragment key={id}>
                {id === 'dateTime' ? (
                  <DateTimeRangeFilter column={column} />
                ) : id === 'yearMonthDate' ? (
                  <YearMonthPicker
                    date={(column.getFilterValue() as Date) || new Date()}
                    setDate={(date) => column.setFilterValue(date)}
                  />
                ) : (
                  <DataTableFacetedFilter
                    column={column}
                    title={title}
                    options={options}
                  />
                )}
              </React.Fragment>
            )
          );
        })}
        {rangeFilterColumns.map(({ id, title, min, max }) => {
          const column = table.getColumn(id);
          return (
            column && (
              <DataTableRangeFilter
                key={id}
                column={column}
                title={title}
                min={min}
                max={max}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setGlobalFilter('');
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
