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
import { getTimeString } from "../_helpers/utils";

export function DateTimePicker({
  children,
  date,
  handleSetDate,
  disablePortal,
  disabledMatcher,
}: Readonly<{
  children?: React.ReactNode;
  date: Date;
  handleSetDate: (date: Date | undefined) => void;
  disablePortal?: boolean;
  disabledMatcher?: (date: Date) => boolean;
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
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
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
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 ">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={getTimeString(date)}
          onChange={handleTimeChange}
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none hover:bg-accent hover:text-accent-foreground"
        />
      </div>
      {children}
    </div>
  );
}
