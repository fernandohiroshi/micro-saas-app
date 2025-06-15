// Next.js navigation
import { redirect } from "next/navigation";

// Session helper
import getSession from "@/lib/getSession";

// Components
import { ServicesContent } from "./_components/service-content";

export default async function Services() {
  // Get current user session
  const session = await getSession();

  // Redirect to home if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <section>
      {/* Render services for authenticated user */}
      <ServicesContent userId={session.user?.id} />
    </section>
  );
}
