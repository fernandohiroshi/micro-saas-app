"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Plan } from "@/generated/prisma"
import { getStripeJs } from "@/utils/stripe-js"

import { createSubscription } from "../_actions/create-subscription"

interface SubscriptionButtonProps {
  type: Plan
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const { sessionId, error } = await createSubscription({ type: type })

    if (error) {
      toast.error(error)
      return
    }

    const stripe = await getStripeJs()

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: sessionId })
    }
  }

  return (
    <Button
      className={`w-full bg-black font-semibold uppercase ${
        type === "PROFESSIONAL" && "bg-cyan-600 hover:bg-cyan-500"
      }`}
      onClick={handleCreateBilling}
    >
      Ativar assinatura
    </Button>
  )
}
