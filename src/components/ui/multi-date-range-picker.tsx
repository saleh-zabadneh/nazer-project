'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface MultiDateRangePickerProps {
  dates: Date[];
  setDates: (dates: Date[]) => void;
}

export function MultiDateRangePicker({
  dates,
  setDates,
}: MultiDateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (days: Date[] | undefined) => {
    if (days) {
      setDates(days);
    }
  };

  const removeDate = (dateToRemove: Date) => {
    setDates(dates.filter((date) => date.getTime() !== dateToRemove.getTime()));
  };

  return (
    <div className="flex flex-col space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !dates?.length && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {dates?.length > 0 ? (
              `${dates?.length} date(s) selected`
            ) : (
              <span>Pick dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {dates?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => (
            <Badge key={date.toISOString()} variant="secondary">
              {format(date, 'MMM dd, yyyy')}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => removeDate(date)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
