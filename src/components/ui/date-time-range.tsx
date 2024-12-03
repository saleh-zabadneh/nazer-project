'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateTimeRangeFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

export function DateTimeRangeFilter<TData, TValue>({
  column,
}: DateTimeRangeFilterProps<TData, TValue>) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [startTime, setStartTime] = React.useState('00:00');
  const [endTime, setEndTime] = React.useState('23:59');

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    applyFilter(selectedDate, startTime, endTime);
  };

  const handleTimeChange = (timeString: string, isStart: boolean) => {
    if (isStart) {
      setStartTime(timeString);
    } else {
      setEndTime(timeString);
    }
    applyFilter(
      date,
      isStart ? timeString : startTime,
      isStart ? endTime : timeString
    );
  };

  const applyFilter = (
    selectedDate: DateRange | undefined,
    start: string,
    end: string
  ) => {
    if (selectedDate?.from && selectedDate?.to) {
      const fromDateTime = new Date(selectedDate.from);
      fromDateTime.setHours(
        parseInt(start.split(':')[0]),
        parseInt(start.split(':')[1])
      );

      const toDateTime = new Date(selectedDate.to);
      toDateTime.setHours(
        parseInt(end.split(':')[0]),
        parseInt(end.split(':')[1])
      );

      column.setFilterValue([fromDateTime, toDateTime]);
    } else {
      column.setFilterValue(undefined);
    }
  };

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return 'Pick a date range';
    if (!range.to) return format(range.from, 'LLL dd, y');
    return `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`;
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="grid grid-cols-2 gap-2 p-3 border-t">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-2 opacity-50" />
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => handleTimeChange(e.target.value, true)}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-2 opacity-50" />
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => handleTimeChange(e.target.value, false)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
