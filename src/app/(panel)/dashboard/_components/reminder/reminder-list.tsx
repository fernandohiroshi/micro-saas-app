"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Plus, Trash } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Reminder } from "@/generated/prisma"

import { deleteReminder } from "../../_actions/delete-reminder"

import { ReminderContent } from "./reminder-content"

interface ReminderListProps {
  reminder: Reminder[]
}

export function ReminderList({ reminder }: ReminderListProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.data)
    router.refresh()
  }

  return (
    <section className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold md:text-2xl">
            Lembretes
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Lembrete</DialogTitle>
                <DialogDescription>
                  Criar um novo lembrete para sua lista
                </DialogDescription>
              </DialogHeader>

              <ReminderContent closeDialog={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {reminder.length === 0 && (
            <p className="text-neutral-600">Nenhum lembrete registrado...</p>
          )}

          <ScrollArea className="h-[340px] w-full flex-1 pr-0 lg:max-h-[calc(100vh-15rem)]">
            {reminder.map((item, index) => (
              <article
                key={item.id}
                className="mb-2 flex flex-row flex-wrap items-center justify-between rounded-md bg-neutral-50 px-2 py-2"
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
  )
}
