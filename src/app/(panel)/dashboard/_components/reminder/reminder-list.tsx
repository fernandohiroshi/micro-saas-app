"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/generated/prisma";
import { Plus, Trash } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  const router = useRouter();

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    router.refresh();
  }

  return (
    <section className="flex flex-col gap-3">
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
            <p className="text-neutral-600">Nenhum lembrete registrado...</p>
          )}

          <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
            {reminder.map((item, index) => (
              <article
                key={item.id}
                className="flex flex-wrap flex-row items-center justify-between py-2 mb-2 px-2 rounded-md bg-neutral-100"
              >
                <p className="text-sm lg:text-base">{item.description}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-red-100"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash className="text-red-700" />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
