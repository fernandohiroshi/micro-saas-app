"use client"

import { useCallback, useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import Image from "next/image"

import { MapPin } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Prisma } from "@/generated/prisma"
import { formatPhone } from "@/utils/formatPhone"

import imageTest from "../../../../../../public/user.png"
import { createNewAppointment } from "../_actions/create-appointment"

import DateTimePicker from "./date-picker"
import { AppointmentFormDate, useAppointmentForm } from "./schedule-form"
import ScheduleTimeList from "./schedule-time-list"

import "react-datepicker/dist/react-datepicker.css"

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
    services: true
  }
}>

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription
}

export interface TimeSlot {
  time: string
  available: boolean
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm()
  const { watch } = form

  const selectedDate = watch("date")
  const selecteServiceId = watch("serviceId")

  const [selectedTime, setSelectedTime] = useState("")
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [blokedTimes, setBlokedTimes] = useState<string[]>([])

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true)

      try {
        const dateString = date.toISOString().split("T")[0]

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`,
        )

        const json = await response.json()
        setLoadingSlots(false)

        return json
      } catch (err) {
        console.log(err)
        setLoadingSlots(false)
        return []
      }
    },
    [clinic.id],
  )

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((bloked) => {
        setBlokedTimes(bloked)
        const times = clinic.times || []

        const finalSlots = times.map((time) => ({
          time: time,
          available: !bloked.includes(time),
        }))

        setAvailableTimeSlots(finalSlots)

        const stillAvailable = finalSlots.find(
          (slot) => slot.time === selectedTime && slot.available,
        )

        if (!stillAvailable) {
          setSelectedTime("")
        }
      })
    }
  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime])

  async function handleRegisterAppointment(formData: AppointmentFormDate) {
    if (!selectedTime) {
      return
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id,
    })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success("Consulta agendada com sucesso!")
    form.reset()
    setSelectedTime("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <div className="h-32 bg-cyan-600" />

      <section className="container mx-auto -mt-16 px-4">
        <div className="mx-auto max-w-2xl">
          <article className="flex flex-col items-center">
            <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-full border-3 bg-white shadow">
              <Image
                src={clinic.image ? clinic.image : imageTest}
                alt="Foto da clínica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="mb-2 line-clamp-1 text-2xl" title={clinic.name!}>
              {clinic.name}
            </h1>
            <div className="flex items-center gap-1">
              <MapPin />
              <span className="line-clamp-1" title={clinic.address!}>
                {clinic.address ? clinic.address : "Endereço não fornecido"}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="mx-2 space-y-6 rounded-md border bg-white p-6 shadow-xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">
                      Nome completo:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Digite seu nome completo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">E-mail:</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Digite seu e-mail..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <div>
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">Telefone:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="phone"
                        placeholder="(xx) xxxxx-xxxx"
                        onChange={(e) => {
                          const formattedValue = formatPhone(e.target.value)
                          field.onChange(formattedValue)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <div>
                  <FormItem className="my-2 flex items-center gap-2">
                    <FormLabel className="font-semibold">
                      Data do agendamento:
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        initialDate={new Date()}
                        className="w-full rounded border bg-neutral-100 p-2"
                        onChange={(date) => {
                          if (date) {
                            field.onChange(date)
                            setSelectedTime("")
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="line-clamp-1 font-semibold">
                      Selecione o serviço:
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedTime("")
                        }}
                      >
                        <SelectTrigger className="w-full px-2">
                          <SelectValue
                            className="line-clamp-1"
                            placeholder="Selecione um serviço"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {clinic.services.map((service) => (
                            <SelectItem
                              key={service.id}
                              value={service.id}
                              className="px-2 text-xs sm:text-sm md:text-base"
                            >
                              {service.name} (
                              {Math.floor(service.duration / 60)}h{" "}
                              {service.duration % 60}min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            {selecteServiceId && (
              <div className="space-y-2">
                <Label className="font-semibold">Horários disponíveis:</Label>
                <div className="rounded border bg-neutral-100 p-2">
                  {loadingSlots ? (
                    <div className="flex justify-center">
                      <PuffLoader size={30} color="darkcyan" />
                    </div>
                  ) : availableTimeSlots.length === 0 ? (
                    <p>Nenhum horário disponivel</p>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={(time) => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      blokedTimes={blokedTimes}
                      availableTimeSlots={availableTimeSlots}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      requiredSlots={
                        clinic.services.find(
                          (service) => service.id === selecteServiceId,
                        )
                          ? Math.ceil(
                              clinic.services.find(
                                (service) => service.id === selecteServiceId,
                              )!.duration / 30,
                            )
                          : 1
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button
                type="submit"
                disabled={
                  !watch("name") ||
                  !watch("email") ||
                  !watch("phone") ||
                  !watch("date")
                }
                className="w-full"
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="rounded-md bg-red-600 px-4 py-2 text-center font-medium text-white">
                A clínica esta fechada nesse momento
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  )
}
