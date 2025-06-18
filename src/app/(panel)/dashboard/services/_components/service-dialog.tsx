"use client";

// React
import { useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Hooks & Form
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./service-dialog-form";

// Utils
import { convertRealToCents } from "@/utils/convertCurrency";

// Actions
import { createNewService } from "../_actions/create-service";
import { updateService } from "../_actions/update-service";

// External libraries
import { toast } from "sonner";

interface ServiceDialogProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export default function ServiceDialog({
  closeModal,
  serviceId,
  initialValues,
}: ServiceDialogProps) {
  const [loading, setLoading] = useState(false);
  const form = useDialogServiceForm({ initialValues });

  // Handle form submission
  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);

    // Convert BRL string price to cents (e.g., "100,00" => 10000)
    const priceInCents = convertRealToCents(values.price);

    // Calculate total duration in minutes
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const duration = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        serviceId,
        name: values.name,
        priceInCents,
        duration,
      });
      return;
    }

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço cadastrado com sucesso!");
    handleCloseModal();
  }

  // Handle update service logic
  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId,
      name,
      price: priceInCents,
      duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    handleCloseModal();
  }

  // Reset form and close modal
  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  // Format input value as BRL currency (e.g., 123456 => 1.234,56)
  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader className="mb-2">
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {/* Service name input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Nome do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome do serviço" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service price input with currency formatting */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Valor do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: 100,00"
                      onChange={changeCurrency}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="font-semibold">Tempo de duração do serviço:</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Hours input */}
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Minutes input */}
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutos:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full font-semibold mt-2"
            disabled={loading}
          >
            {loading ? (
              <p>Carregando...</p>
            ) : (
              `${serviceId ? "Atualizar serviço" : "Cadastrar serviço"}`
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
