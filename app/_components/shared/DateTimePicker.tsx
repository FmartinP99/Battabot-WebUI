"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { getTimeString } from "../../helpers/utils";

export function DateTimePicker({
  children,
  date,
  handleSetDate,
  disablePortal,
  disabledMatcher,
  extraClassName,
}: Readonly<{
  children?: React.ReactNode;
  date: Date;
  handleSetDate: (date: Date | undefined) => void;
  disablePortal?: boolean;
  disabledMatcher?: (date: Date) => boolean;
  extraClassName?: string;
}>) {
  const [open, setOpen] = React.useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    if (!timeValue) return;
    const [hours, minutes, seconds] = timeValue.split(":").map(Number);
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(hours, minutes, seconds || 0, 0);
    handleSetDate(newDate);
  };

  return (
    <div className={`flex gap-3 ${extraClassName}`}>
      <div className="flex flex-col gap-2 flex-1">
        <Label
          htmlFor="date-picker"
          className="text-xs font-semibold text-accent-x3 uppercase tracking-wide"
        >
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-between font-normal bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-primary-x1 border-primary-x3"
            align="start"
            disablePortal={disablePortal}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              disabled={disabledMatcher ?? false}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  const timeRef = date || new Date();
                  selectedDate.setHours(
                    timeRef.getHours(),
                    timeRef.getMinutes(),
                    timeRef.getSeconds() || 0,
                    timeRef.getMilliseconds() || 0
                  );
                }
                handleSetDate(selectedDate);
                setOpen(false);
              }}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Label
          htmlFor="time-picker"
          className="text-xs font-semibold text-accent-x3 uppercase tracking-wide"
        >
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={getTimeString(date)}
          onChange={handleTimeChange}
          className="cursor-pointer appearance-none bg-primary-x2 border-primary-x3 text-accent-x2  hover:border-accent-x1 focus:border-accent-x1 focus:ring-1 focus:ring-accent-x1 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>

      {children}
    </div>
  );
}
