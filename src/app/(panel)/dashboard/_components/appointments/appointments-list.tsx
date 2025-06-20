"use client";

import { useSearchParams } from "next/navigation";

interface AppointmestListProps {
  times: string[];
}

export default function AppointmentsList({ times }: AppointmestListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  console.log(date);

  return <div>lista de horarios</div>;
}
