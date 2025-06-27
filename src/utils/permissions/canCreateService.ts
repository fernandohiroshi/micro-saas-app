"use server"

import { Session } from "next-auth"

import { Subscription } from "@/generated/prisma"
import prisma from "@/lib/prisma"

import { PLANS } from "../plans"

import { ResultPermissionProps } from "./canPermission"
import { checkSubscriptionExpired } from "./checkSubscriptionExpired"
import { getPlan } from "./get-plans"

export async function canCreateService(
  subscription: Subscription | null,
  session: Session,
): Promise<ResultPermissionProps> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
        status: true,
      },
    })

    if (subscription && subscription.status === "active") {
      const plan = subscription.plan
      const planLimits = await getPlan(plan)

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS[subscription.plan],
      }
    }

    const checkUserLmit = await checkSubscriptionExpired(session)

    return checkUserLmit
  } catch (err) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: false,
      plan: null,
    }
  }
}
