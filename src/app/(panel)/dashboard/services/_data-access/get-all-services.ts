"use server"

import prisma from "@/lib/prisma"

interface GetAllServicesProps {
  userId: string
}

export async function getAllServices({ userId }: GetAllServicesProps) {
  if (!userId) {
    return {
      error: "Falha ao buscar serviços",
    }
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        userId,
        status: true,
      },
    })

    return {
      data: services,
    }
  } catch (error) {
    return {
      error: "Falha ao buscar serviços",
    }
  }
}
