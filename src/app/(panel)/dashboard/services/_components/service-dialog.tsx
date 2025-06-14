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

// External libs
import { toast } from "sonner";

interface ServiceDialogProps {
  closeModal: () => void;
}

export default function ServiceDialog({ closeModal }: ServiceDialogProps) {
  const [loading, setLoading] = useState(false);
  const form = useDialogServiceForm();

  // Handle form submission
  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);

    // Convert price string (e.g., "100,00") to integer cents (e.g., 10000)
    const priceInCents = convertRealToCents(values.price);

    // Calculate total service duration in minutes
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const duration = hours * 60 + minutes;

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço cadastrado com sucesso!");
    handleCloseModal();
  }

  // Close the modal and reset form values
  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  // Format currency input to BRL style (e.g., 123456 => 1.234,56)
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
            {loading ? "Cadastrando..." : "Adicionar serviço"}
          </Button>
        </form>
      </Form>
    </>
  );
}
