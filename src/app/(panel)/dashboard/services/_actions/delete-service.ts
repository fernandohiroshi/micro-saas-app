"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

const formSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteService(formData: FormSchema) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: "Failed to delete service",
    }
  }

  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    }
  }

  try {
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        status: false,
      },
    })

    revalidatePath("/dashboard/services")

    return {
      data: "Service deleted successfully!",
    }
  } catch (err) {
    console.log(err)
    return {
      error: "Failed to delete service",
    }
  }
}
