import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminders";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <section className="space-x-2 flex items-center justify-end">
        <Link href={`/clinica/${session.user?.id}`} target="_blank">
          <Button className="flex-1 md:flex-[0]">
            <Calendar />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 mt-4">
        <div>AGENDA</div>
        <Reminders userId={session.user?.id!} />
      </section>
    </main>
  );
}
