"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/generated/prisma";

interface SubscriptionProps {
  type: Plan;
}

export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      sessionId: "",
      error: "Falha ao ativar plano",
    };
  }

  console.log("(SERVER): Ativar Plano", type);

  return {
    sessionId: "123",
  };
}
