"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function updateProfileAvatar({
  avatarUrl,
}: {
  avatarUrl: string
}) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado",
    }
  }

  if (!avatarUrl) {
    return {
      error: "Falha ao alterar imagem",
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        image: avatarUrl,
      },
    })

    revalidatePath("/dashboard/profile")

    return {
      data: "Imagem alterada com sucesso!",
    }
  } catch (err) {
    return {
      error: "Falha ao alterar imagem",
    }
  }
}
