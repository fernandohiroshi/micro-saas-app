"use client";

import { Button } from "@/components/ui/button";
import { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlots: number;
  blokedTimes: string[];
  availableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}

export default function ScheduleTimeList({
  availableTimeSlots,
  blokedTimes,
  requiredSlots,
  selectedDate,
  selectedTime,
  clinicTimes,
  onSelectTime,
}: ScheduleTimeListProps) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {
        return (
          <Button
            onClick={() => onSelectTime(slot.time)}
            variant="outline"
            key={slot.time}
            type="button"
            className={cn(
              "h-10 select-none",
              selectedTime === slot.time && "border-cyan-500 border-2"
            )}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
