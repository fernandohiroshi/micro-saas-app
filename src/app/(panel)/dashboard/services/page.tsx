import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { ServicesContent } from "./_components/service-content";

export default async function Services() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <section>
      <ServicesContent userId={session.user?.id} />
    </section>
  );
}
