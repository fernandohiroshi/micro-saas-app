"use server"

import { addDays, differenceInDays, isAfter } from "date-fns"

import prisma from "@/lib/prisma"

import { TRIAL_DAY } from "./trial-limits"

export async function checkSubscription(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  })

  if (!user) {
    throw new Error("Usuário não encontrado!")
  }

  if (user.subscription && user.subscription.status === "active") {
    return {
      subscriptionStatus: "active",
      message: "Assinatura ativa",
      planId: user.subscription.plan,
    }
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAY)

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: "EXPIRED",
      message: "Seu período de teste expirou.",
      planId: "TRIAL",
    }
  }
  const daysRemaining = differenceInDays(trialEndDate, new Date())

  return {
    subscriptionStatus: "TRIAL",
    message: `Teste gratuito termina em ${daysRemaining} ${
      daysRemaining === 1 ? "dia" : "dias"
    }.`,
    planId: "TRIAL",
  }
}
