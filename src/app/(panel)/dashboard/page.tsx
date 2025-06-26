import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";


export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscription(session?.user?.id!);

  return (
    <main>
      <section className="flex justify-end items-center space-x-2">
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
        <p className="text-cyan-600 font-semibold animate-pulse my-2">
          {subscription.message}
        </p>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-4 text-sm">
          <Appointments userId={session.user?.id!} />
          <Reminders userId={session.user?.id!} />
        </section>
      )}
    </main>
  );
}
