"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

export function ButtonPickerAppointment() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  )

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value)

    const url = new URL(window.location.href)

    url.searchParams.set("date", event.target.value)
    router.push(url.toString())
  }

  return (
    <input
      type="date"
      id="start"
      className="rounded border-2 px-2 py-1 text-sm lg:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  )
}
