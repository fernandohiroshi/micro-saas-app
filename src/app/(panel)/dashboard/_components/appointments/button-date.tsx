"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ButtonPickerAppointment() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value);

    const url = new URL(window.location.href);

    url.searchParams.set("date", event.target.value);
    router.push(url.toString());
  }

  return (
    <input
      type="date"
      id="start"
      className="border-2 px-2 py-1 rounded text-sm lg:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  );
}
