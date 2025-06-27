"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

const formSchema = z.object({
  description: z.string().min(1, "A descrição do lembrete é obrigatória"),
})

type FormSchema = z.infer<typeof formSchema>

export async function createReminder(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: "Falha ao cadastrar lembrete",
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    }
  }

  try {
    await prisma.reminder.create({
      data: {
        description: formData.description,
        userId: session?.user?.id,
      },
    })

    revalidatePath("/dashboard")

    return {
      data: "Lembrete cadastrado com sucesso!",
    }
  } catch (err) {
    console.log(err)

    return {
      error: "Falha ao cadastrar lembrete",
    }
  }
}
