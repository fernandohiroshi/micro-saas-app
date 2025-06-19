"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/generated/prisma";
import { Plus, Trash } from "lucide-react";

interface ReminderListProps {
  reminder: Reminder[];
}

export default function ReminderList({ reminder }: ReminderListProps) {
  console.log(reminder);

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Button variant="outline">
            <Plus />
          </Button>
        </CardHeader>

        <CardContent>
          {reminder.length === 0 && (
            <p className="text-neutral-700">Nenhum lembrete registrado...</p>
          )}

          {reminder.map((item, index) => (
            <article
              key={item.id}
              className="flex flex-wrap flex-row items-center justify-between py-2 mb-2 px-2 rounded-md bg-neutral-100"
            >
              <p className="text-sm lg:text-base">{item.description}</p>
              <Button size="icon" variant="ghost" className="hover:bg-red-100">
                <Trash className="text-red-700" />
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
