"use client"

import { useState } from "react"
import { PuffLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"

import { Eye, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Prisma } from "@/generated/prisma"

import { cancelAppointment } from "../../_actions/cancel-appointment"

import { AppointmentDialog } from "./appointment-dialog"
import { ButtonPickerAppointment } from "./button-date"

import { useQuery, useQueryClient } from "@tanstack/react-query"

export type AppointmentsWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true
  }
}>

interface AppointmestListProps {
  times: string[]
}

export function AppointmentsList({ times }: AppointmestListProps) {
  const searchParams = useSearchParams()
  const date = searchParams.get("date")
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentsWithService | null>(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd")
        activeDate = today
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`

      const response = await fetch(url)

      const json = (await response.json()) as AppointmentsWithService[]

      if (!response.ok) {
        return []
      }

      return json
    },
    staleTime: 20000,
    refetchInterval: 60000,
  })

  const occupantMap: Record<string, AppointmentsWithService> = {}

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30)

      const startIndex = times.indexOf(appointment.time)

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment
          }
        }
      }
    }
  }

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId: appointmentId })

    if (response.error) {
      toast.error(response.error)
      return
    }
    queryClient.invalidateQueries({ queryKey: ["get-appointments"] })
    await refetch()
    toast.success(response.data)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2 md:flex-row">
          <CardTitle className="text-lg font-bold md:text-2xl">
            Agendamentos
          </CardTitle>

          <ButtonPickerAppointment />
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] pr-1 md:pr-3 lg:h-[calc(100vh-15rem)]">
            {isLoading ? (
              <div className="mt-8 flex items-start justify-center">
                <PuffLoader size="100px" color="darkcyan" />
              </div>
            ) : (
              times.map((slot) => {
                const occupant = occupantMap[slot]

                if (occupant) {
                  return (
                    <div
                      key={slot}
                      className="flex items-center border-t bg-neutral-50 p-2 py-2 last:border-b"
                    >
                      <div className="w-16 text-xs font-semibold lg:text-sm">
                        {slot}
                      </div>

                      <div className="flex-1 text-xs text-neutral-700 lg:text-sm">
                        <div className="line-clamp-1 font-semibold">
                          {occupant.name}
                        </div>
                        <div className="hidden text-neutral-700 md:block">
                          {occupant.phone}
                        </div>
                      </div>

                      <div className="ml-auto">
                        <div className="flex gap-1">
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-cyan-100"
                              onClick={() => setDetailAppointment(occupant)}
                            >
                              <Eye />
                            </Button>
                          </DialogTrigger>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100"
                            onClick={() => handleCancelAppointment(occupant.id)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={slot}
                    className="flex items-center border-t p-2 py-2 last:border-b"
                  >
                    <div className="w-16 text-xs font-semibold lg:text-sm">
                      {slot}
                    </div>

                    <div className="flex-1 text-xs text-neutral-700 lg:text-sm">
                      Disponível
                    </div>
                  </div>
                )
              })
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <AppointmentDialog appointments={detailAppointment} />
    </Dialog>
  )
}
