"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./service-dialog-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ServiceDialog() {
  const form = useDialogServiceForm();

  async function onSubmit(values: DialogServiceFormData) {
    console.log(values);
  }

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

          <Button type="submit" className="w-full font-semibold mt-2">
            Adicionar serviço
          </Button>
        </form>
      </Form>
    </>
  );
}
