import Link from "next/link"
import { redirect } from "next/navigation"

import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LabelSubscription } from "@/components/ui/label-subscription"
import getSession from "@/lib/getSession"
import { checkSubscription } from "@/utils/permissions/checkSubscription"

import { Appointments } from "./_components/appointments/appointments"
import { ButtonCopyLink } from "./_components/button-copy-link"
import { Reminders } from "./_components/reminder/reminders"

export default async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const subscription = await checkSubscription(session?.user?.id!)

  return (
    <main>
      <section className="flex items-center justify-end space-x-2">
        <Link href={`/clinica/${session.user?.id}`} target="_blank">
          <Button className="flex-1 md:flex-[0]">
            <Calendar />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id} />
      </section>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription?.subscriptionStatus === "TRIAL" && (
        <p className="my-2 animate-pulse font-semibold text-cyan-600">
          {subscription.message}
        </p>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="mt-4 grid grid-cols-1 gap-4 text-sm lg:grid-cols-2">
          <Appointments userId={session.user?.id!} />
          <Reminders userId={session.user?.id!} />
        </section>
      )}
    </main>
  )
}
