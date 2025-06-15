"use server";

import prisma from "@/lib/prisma";

export async function getInfoSchedule({ userId }: { userId: string }) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
        services: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    console.log(err);
  }
}
