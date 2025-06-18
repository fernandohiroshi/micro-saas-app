"use client";

import Image from "next/image";
import imageTest from "../../../../../../public/user.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma";
import { useAppointmentForm, AppointmentFormDate } from "./schedule-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/formatPhone";
import DateTimePicker from "./date-picker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import ScheduleTimeList from "./schedule-time-list";
import { PuffLoader } from "react-spinners";
import { createNewAppointment } from "../_actions/create-appointment";
import { toast } from "sonner";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  const selectedDate = watch("date");
  const selecteServiceId = watch("serviceId");

  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blokedTimes, setBlokedTimes] = useState<string[]>([]);

  //Function for get bloked times (by fetch http)
  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);

      try {
        const dateString = date.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );

        const json = await response.json();
        setLoadingSlots(false);

        return json;
      } catch (err) {
        console.log(err);
        setLoadingSlots(false);
        return [];
      }
    },
    [clinic.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((bloked) => {
        setBlokedTimes(bloked);
        const times = clinic.times || [];

        const finalSlots = times.map((time) => ({
          time: time,
          available: !bloked.includes(time),
        }));

        setAvailableTimeSlots(finalSlots);
      });
    }
  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime]);

  async function handleRegisterAppointment(formData: AppointmentFormDate) {
    if (!selectedTime) {
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Consulta agendada com sucesso!");
    form.reset();
    setSelectedTime("");
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <div className="h-32 bg-cyan-600" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative h-48 w-48 rounded-full overflow-hidden shadow bg-white mb-8 border-3">
              <Image
                src={clinic.image ? clinic.image : imageTest}
                alt="Foto da clínica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl mb-2">{clinic.name}</h1>
            <div className="flex gap-1 items-center">
              <MapPin />
              <span>
                {clinic.address ? clinic.address : "Endereço não fornecido"}
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Form Schedule */}
      <section className="max-w-2xl mx-auto mt-6 w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="space-y-6 p-6 shadow-xl border rounded-md mx-2 bg-white"
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
                          const formattedValue = formatPhone(e.target.value);
                          field.onChange(formattedValue);
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
                            field.onChange(date);
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
                  <FormItem className="">
                    <FormLabel className="font-semibold">
                      Selecione o serviço:
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {clinic.services.map((service) => (
                            <SelectItem
                              key={service.id}
                              value={service.id}
                              className="text-xs sm:text-sm md:text-base"
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
                <div className="bg-neutral-100 p-2 rounded border">
                  {loadingSlots ? (
                    <div className="flex justify-center">
                      <PuffLoader size={50} color="darkcyan" />
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
                          (service) => service.id === selecteServiceId
                        )
                          ? Math.ceil(
                              clinic.services.find(
                                (service) => service.id === selecteServiceId
                              )!.duration / 30
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
              <p className="bg-red-600 font-medium text-white rounded-md text-center px-4 py-2">
                A clínica esta fechada nesse momento
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  );
}
