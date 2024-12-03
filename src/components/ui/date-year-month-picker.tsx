'use client';

import * as React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
} from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YearMonthPickerProps {
  date: Date;
  setDate: (date: Date) => void;
  fromYear?: number;
  toYear?: number;
}

export function YearMonthPicker({
  date,
  setDate,
  fromYear = 2020,
  toYear = new Date()?.getFullYear(),
}: YearMonthPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(date?.getFullYear());

  const years = React.useMemo(() => {
    return Array.from(
      { length: toYear - fromYear + 1 },
      (_, i) => fromYear + i
    );
  }, [fromYear, toYear]);

  const months = React.useMemo(() => {
    return eachMonthOfInterval({
      start: new Date(currentYear, 0, 1),
      end: new Date(currentYear, 11, 31),
    });
  }, [currentYear]);

  const handleYearChange = (year: string) => {
    setCurrentYear(parseInt(year, 10));
  };

  const handleMonthSelect = (month: Date) => {
    setDate(month);
    setIsOpen(false);
  };

  const handlePrevYear = () => {
    setCurrentYear((prev) => Math.max(prev - 1, fromYear));
  };

  const handleNextYear = () => {
    setCurrentYear((prev) => Math.min(prev + 1, toYear));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'MMMM yyyy') : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevYear}
            disabled={currentYear <= fromYear}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select
            value={currentYear?.toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue>{currentYear}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextYear}
            disabled={currentYear >= toYear}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          {months.map((month) => {
            const isSelected =
              date &&
              month?.getMonth() === date?.getMonth() &&
              month?.getFullYear() === date?.getFullYear();
            const isDisabled =
              month > new Date() ||
              month < startOfMonth(new Date(fromYear, 0, 1));

            return (
              <Button
                key={month.toISOString()}
                onClick={() => handleMonthSelect(month)}
                variant={isSelected ? 'default' : 'outline'}
                className={cn(
                  'h-9 w-full',
                  isSelected && 'bg-primary text-primary-foreground',
                  isDisabled && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isDisabled}
              >
                {format(month, 'MMM')}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
