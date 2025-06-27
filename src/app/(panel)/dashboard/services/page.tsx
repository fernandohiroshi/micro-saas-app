import { Suspense } from "react"
import { PuffLoader } from "react-spinners"
import { redirect } from "next/navigation"

import getSession from "@/lib/getSession"

import { ServicesContent } from "./_components/service-content"

export default async function Services() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <section>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <PuffLoader size="200px" color="darkcyan" />
          </div>
        }
      >
        <ServicesContent userId={session.user?.id} />
      </Suspense>
    </section>
  )
}
