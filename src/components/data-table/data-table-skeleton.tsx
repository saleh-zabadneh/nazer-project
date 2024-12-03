import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  columnCount?: number;
  rowCount?: number;
  searchableColumnCount?: number;
  filterableColumnCount?: number;
  showViewOptions?: boolean;
  cellWidths?: string[];
  withPagination?: boolean;
  shrinkZero?: boolean;
  showToolbar?: boolean;
  toolbarHeight?: string;
  showFooter?: boolean;
  footerHeight?: string;
  cellHeight?: string;
  headerHeight?: string;
  rowClassName?: string;
  cellClassName?: string;
}

export function DataTableSkeleton({
  columnCount = 6,
  rowCount = 10,
  searchableColumnCount = 2,
  filterableColumnCount = 4,
  showViewOptions = true,
  cellWidths = ['auto'],
  withPagination = true,
  shrinkZero = false,
  showToolbar = true,
  toolbarHeight = 'h-10',
  showFooter = false,
  footerHeight = 'h-10',
  cellHeight = 'h-6',
  headerHeight = 'h-10',
  rowClassName = '',
  cellClassName = '',
  className,
  ...skeletonProps
}: DataTableSkeletonProps) {
  return (
    <div
      className={cn('w-full space-y-2.5 overflow-auto', className)}
      {...skeletonProps}
    >
      {showToolbar && (
        <div
          className={cn(
            'flex items-center justify-between w-full p-1 space-x-2 overflow-auto',
            toolbarHeight
          )}
        >
          <div className="flex items-center flex-1 space-x-2">
            {searchableColumnCount > 0 &&
              Array.from({ length: searchableColumnCount }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn('w-40 lg:w-60', toolbarHeight)}
                />
              ))}
            {filterableColumnCount > 0 &&
              Array.from({ length: filterableColumnCount }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn('w-[4.5rem] border-dashed', toolbarHeight)}
                />
              ))}
          </div>
          {showViewOptions && (
            <Skeleton
              className={cn('ml-auto hidden w-[4.5rem] lg:flex', toolbarHeight)}
            />
          )}
        </div>
      )}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className={cn('hover:bg-transparent', rowClassName)}>
              {Array.from({ length: columnCount }).map((_, j) => (
                <TableHead
                  key={j}
                  style={{
                    width: cellWidths[j % cellWidths.length],
                    minWidth: shrinkZero
                      ? cellWidths[j % cellWidths.length]
                      : 'auto',
                  }}
                >
                  <Skeleton className={cn('w-full', headerHeight)} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow
                key={i}
                className={cn('hover:bg-transparent', rowClassName)}
              >
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cellWidths[j % cellWidths.length],
                      minWidth: shrinkZero
                        ? cellWidths[j % cellWidths.length]
                        : 'auto',
                    }}
                    className={cellClassName}
                  >
                    <Skeleton className={cn('w-full', cellHeight)} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {withPagination && (
        <div className="flex items-center justify-between w-full gap-4 p-1 overflow-auto sm:gap-8">
          <Skeleton className="w-40 h-7 shrink-0" />
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-24 h-7" />
              <Skeleton className="h-7 w-[4.5rem]" />
            </div>
            <div className="flex items-center justify-center text-sm font-medium">
              <Skeleton className="w-20 h-7" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="hidden size-7 lg:block" />
              <Skeleton className="size-7" />
              <Skeleton className="size-7" />
              <Skeleton className="hidden size-7 lg:block" />
            </div>
          </div>
        </div>
      )}
      {showFooter && (
        <div className={cn('w-full', footerHeight)}>
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
