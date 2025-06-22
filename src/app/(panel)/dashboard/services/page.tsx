// Next.js navigation
import { redirect } from "next/navigation";

// Session helper
import getSession from "@/lib/getSession";

// Components
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";
import { PuffLoader } from "react-spinners";

export default async function Services() {
  // Get current user session
  const session = await getSession();

  // Redirect to home if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <section>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <PuffLoader size="200px" color="darkcyan" />
          </div>
        }
      >
        <ServicesContent userId={session.user?.id} />
      </Suspense>
    </section>
  );
}
