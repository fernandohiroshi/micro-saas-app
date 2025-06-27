"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Subscription } from "@/generated/prisma"
import { subscriptionPlans } from "@/utils/plans"

import { createPortalCustomer } from "../_actions/create-portal-customer"

interface SubscriptionDetailProps {
  subscription: Subscription
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan,
  )

  async function handleManageSubscription() {
    const portal = await createPortalCustomer()

    if (portal.error) {
      toast.error("Ocorreu um erro ao criar o portal de assinatura.")
      return
    }

    window.location.href = portal.sessionId
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl">
          <div> Seu Plano Atual</div>
          <div className="animate-pulse rounded-md bg-cyan-500 px-3 py-1 text-lg text-white lg:text-xl">
            {subscription.status === "active" ? "ATIVO" : "INATIVO"}
          </div>
        </CardTitle>
        <CardDescription>Sua assinatura:</CardDescription>
      </CardHeader>

      <CardContent>
        <h3 className="mb-4 text-lg font-semibold lg:text-xl">
          {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
        </h3>

        <ul className="list-inside list-disc space-y-2">
          {subscriptionInfo &&
            subscriptionInfo.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button onClick={handleManageSubscription}>Gerenciar Assinatura</Button>
      </CardFooter>
    </Card>
  )
}
