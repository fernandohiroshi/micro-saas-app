"use client";

import { Subscription } from "@/generated/prisma";
import { toast } from "sonner";
import { subscriptionPlans } from "@/utils/plans";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan
  );

  async function handleManageSubscription() {
    const portal = await createPortalCustomer();

    if (portal.error) {
      toast.error("Ocorreu um erro ao criar o portal de assinatura.");
      return;
    }

    window.location.href = portal.sessionId;
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between">
          <div> Seu Plano Atual</div>
          <div className="bg-cyan-500 text-white animate-pulse px-3 py-1 rounded-md text-lg lg:text-xl">
            {subscription.status === "active" ? "ATIVO" : "INATIVO"}
          </div>
        </CardTitle>
        <CardDescription>Sua assinatura:</CardDescription>
      </CardHeader>

      <CardContent>
        <h3 className="font-semibold text-lg lg:text-xl mb-4">
          {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
        </h3>

        <ul className="list-disc list-inside space-y-2">
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
  );
}
