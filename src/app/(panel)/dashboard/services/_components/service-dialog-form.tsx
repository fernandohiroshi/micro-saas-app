"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
})

export interface useDialogServiceFormProps {
  initialValues?: {
    name: string
    price: string
    hours: string
    minutes: string
  }
}

export type DialogServiceFormData = z.infer<typeof formSchema>

export function useDialogServiceForm({
  initialValues,
}: useDialogServiceFormProps) {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  })
}
