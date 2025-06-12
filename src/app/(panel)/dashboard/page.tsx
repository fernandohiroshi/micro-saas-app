import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <section>
      dashboard
      <div className="w-full h-[600px] bg-neutral-200 mb-10"></div>
      <div className="w-full h-[600px] bg-neutral-200 mb-10"></div>
      <div className="w-full h-[600px] bg-neutral-200 mb-10"></div>
    </section>
  );
}
