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

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export default function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  async function handleRegisterAppointment(formData: AppointmentFormDate) {
    console.log(formData);
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
