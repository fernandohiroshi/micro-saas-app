import Image from "next/image"
import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Prisma } from "@/generated/prisma"

import img from "../../../../public/user.png"

import { PremiumCardBadge } from "./premium-badge"

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true
  }
}>

interface ProfessionalsProps {
  professionals: UserWithSubscription[]
}

export default function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-xl font-bold md:text-3xl">
          Clínicas Disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {professionals.map((clinic) => (
            <Card
              className="p-0 duration-300 ease-in-out md:hover:shadow-xl"
              key={clinic.id}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-56 overflow-hidden rounded-t-lg">
                    <Image
                      src={clinic.image ?? img}
                      alt="Imagem da clínica"
                      fill
                      className="object-cover"
                    />

                    {clinic?.subscription?.plan === "PROFESSIONAL" && (
                      <PremiumCardBadge />
                    )}
                  </div>
                </div>

                <div className="flex min-h-[140px] flex-col justify-between space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="line-clamp-1 font-semibold"
                        title={clinic.name!}
                      >
                        {clinic.name}
                      </h3>
                      <p className="line-clamp-2 text-sm text-neutral-700">
                        {clinic.address ?? "Endereço não informado."}
                      </p>
                    </div>
                  </div>

                  <Button asChild className="items-centerw-full flex" size="sm">
                    <Link href={`/clinica/${clinic.id}`}>
                      Agendar horário
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  )
}
