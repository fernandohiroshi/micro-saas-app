"use client"

import { useState } from "react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { convertRealToCents } from "@/utils/convertCurrency"

import { createNewService } from "../_actions/create-service"
import { updateService } from "../_actions/update-service"

import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./service-dialog-form"

interface ServiceDialogProps {
  closeModal: () => void
  serviceId?: string
  initialValues?: {
    name: string
    price: string
    hours: string
    minutes: string
  }
}

export default function ServiceDialog({
  closeModal,
  serviceId,
  initialValues,
}: ServiceDialogProps) {
  const [loading, setLoading] = useState(false)
  const form = useDialogServiceForm({ initialValues })

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true)

    const priceInCents = convertRealToCents(values.price)

    const hours = parseInt(values.hours) || 0
    const minutes = parseInt(values.minutes) || 0
    const duration = hours * 60 + minutes

    if (serviceId) {
      await editServiceById({
        serviceId,
        name: values.name,
        priceInCents,
        duration,
      })
      return
    }

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration,
    })

    setLoading(false)

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success("Serviço cadastrado com sucesso!")
    handleCloseModal()
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string
    name: string
    priceInCents: number
    duration: number
  }) {
    const response = await updateService({
      serviceId,
      name,
      price: priceInCents,
      duration,
    })

    setLoading(false)

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.data)
    handleCloseModal()
  }

  function handleCloseModal() {
    form.reset()
    closeModal()
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target
    value = value.replace(/\D/g, "")

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2)
      value = value.replace(".", ",")
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    event.target.value = value
    form.setValue("price", value)
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

          <p className="font-semibold">Tempo do serviço:</p>

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

          <Button
            type="submit"
            className="mt-2 w-full font-semibold"
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
  )
}
