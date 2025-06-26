import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";

import img from "../../../../public/user.png";
import { Prisma } from "@/generated/prisma";
import { PremiumCardBadge } from "./premium-badge";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}

export default function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-3xl text-center mb-12 font-bold">
          Clínicas Disponíveis
        </h2>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {professionals.map((clinic) => (
            <Card
              className="p-0 md:hover:shadow-xl ease-in-out duration-300"
              key={clinic.id}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-56 rounded-t-lg overflow-hidden">
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

                <div className="p-4 space-y-4 min-h-[140px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p className="text-sm text-neutral-700 line-clamp-2">
                        {clinic.address ?? "Endereço não informado."}
                      </p>
                    </div>
                  </div>

                  <Button asChild className="flex items-centerw-full" size="sm">
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
  );
}
