"use server";

import { addDays, isAfter } from "date-fns";
import { Session } from "next-auth";
import { ResultPermissionProps } from "./canPermission";

const TRAIL_DAY = 3;

export async function checkSubscriptionExpired(
  session: Session
): Promise<ResultPermissionProps> {
  const trailEndDate = addDays(session?.user?.createdAt!, TRAIL_DAY);

  if (isAfter(new Date(), trailEndDate)) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  return {
    hasPermission: true,
    planId: "TRIAL",
    expired: false,
    plan: null,
  };
}
