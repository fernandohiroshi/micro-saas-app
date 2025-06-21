"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

interface AppointmestListProps {
  times: string[];
}

export default function AppointmentsList({ times }: AppointmestListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  console.log(date);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold">
          Agendamentos
        </CardTitle>

        <button>SELECIONAR DATA</button>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
          {times.map((slot) => {
            return (
              <div
                key={slot}
                className="flex items-center py-2 border-t last:border-b"
              >
                <div className="w-16 text-sm font-semibold">{slot}</div>

                <div className="flex-1 text-sm text-neutral-700">
                  Disponível
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
