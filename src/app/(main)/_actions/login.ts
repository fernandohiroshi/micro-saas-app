"use server";

import { signIn } from "@/lib/auth";

export async function handleRegister(provider: string) {
  await signIn(provider, { redirectTo: "/dashboard" });
}
