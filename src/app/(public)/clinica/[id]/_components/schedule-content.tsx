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
      <section className="max-w-2xl mx-auto mt-6 w-full">
        <Form {...form}>
          <form className="space-y-6 p-6 shadow-xl border rounded-md mx-2">
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
                        className="w-full rounded border p-2"
                        onChange={(date) => {
                          if (date) {
                            field.onChange(date);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </form>
        </Form>
      </section>
    </div>
  );
}
