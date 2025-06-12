"use client";

import { useProfileForm } from "./profile-form";
import Image from "next/image";
import img from "../../../../../../public/home-grid/02.jpg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProfileContent() {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useProfileForm();

  //   TIMES FUNCTION
  function generateTimeSlots(): string[] {
    const hours: string[] = [];

    for (let i = 8; i <= 22; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minuts = (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}:${minuts}`);
      }
    }

    return hours;
  }

  const hours = generateTimeSlots();

  //   TIMES STATES
  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba")
  );

  return (
    <section className="mx-auto">
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl uppercase">Meus dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden shadow">
                  <Image
                    src={img}
                    alt="Profile Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* NAME */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Nome:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome da clínica ..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ADDRESS */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Endereço:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o endereço ..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PHONE */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Telefone:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o telefone ..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* STATUS */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Status da clínica:
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ? "active" : "inactive"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">
                              Clínica aberta (Ativo)
                            </SelectItem>

                            <SelectItem value="inactive">
                              Clínica fechada (Inativo)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* TIME MODAL */}
                <div className="space-y-2">
                  <Label className="font-semibold">Configurar Horários:</Label>

                  <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        Clique aqui para selecionar horários
                        <ArrowRight />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários da clinica</DialogTitle>
                        <DialogClose />
                        <DialogDescription>
                          Selecione abaixo os horários de funcionamento da
                          clínica
                        </DialogDescription>
                      </DialogHeader>

                      <section className="py-4">
                        <p className="mb-2">
                          Clique nos horários para marcar ou desmarcar:
                        </p>

                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              key={hour}
                              variant="outline"
                              className={cn(
                                "h-10",
                                selectedHours.includes(hour) &&
                                  "border-cyan-500 border-2"
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button
                        className="w-full"
                        onClick={() => setDialogIsOpen(false)}
                      >
                        Finalizar
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* TIME ZONE */}
                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Selecione o fuso horário
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o seu fuso horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
}
