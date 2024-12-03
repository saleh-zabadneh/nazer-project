'use client';

import React from 'react';
import { Column } from '@tanstack/react-table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DataTableRangeFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  min: number;
  max: number;
}

export function DataTableRangeFilter<TData, TValue>({
  column,
  title,
  min,
  max,
}: DataTableRangeFilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue() as
    | [number, number]
    | undefined;

  const [minValue, setMinValue] = React.useState(columnFilterValue?.[0] ?? min);
  const [maxValue, setMaxValue] = React.useState(columnFilterValue?.[1] ?? max);

  const handleMinChange = (value: number) => {
    setMinValue(value);
    column.setFilterValue((old: [number, number] | undefined) => [
      value,
      old?.[1] ?? maxValue,
    ]);
  };

  const handleMaxChange = (value: number) => {
    setMaxValue(value);
    column.setFilterValue((old: [number, number] | undefined) => [
      old?.[0] ?? minValue,
      value,
    ]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 border-dashed">
          {title}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">
              Set the range for {title.toLowerCase()}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label htmlFor="min" className="text-xs">
                  Min
                </Label>
                <Input
                  id="min"
                  type="number"
                  min={min}
                  max={maxValue}
                  value={minValue}
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                  className={cn(
                    'h-8',
                    columnFilterValue?.[0] === undefined &&
                      'text-muted-foreground'
                  )}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="max" className="text-xs">
                  Max
                </Label>
                <Input
                  id="max"
                  type="number"
                  min={minValue}
                  max={max}
                  value={maxValue}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className={cn(
                    'h-8',
                    columnFilterValue?.[1] === undefined &&
                      'text-muted-foreground'
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
