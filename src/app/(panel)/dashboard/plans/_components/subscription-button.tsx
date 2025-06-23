"use client";

import { Button } from "@/components/ui/button";
import { Plan } from "@/generated/prisma";
import { createSubscription } from "../_actions/create-subscription";

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const response = await createSubscription({ type: type });
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
  );
}
