"use client";

import Image from "next/image";
import imageTest from "../../../../../../public/user.png";
import { Divide, MapPin } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-cyan-600" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative h-48 w-48 rounded-full overflow-hidden shadow bg-white mb-8 border-2">
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
      <Form {...form}>
        <form className="space-y-6 bg-white p-6 shadow border rounded-md mx-2">
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
                      placeholder="Digite seu nome completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
