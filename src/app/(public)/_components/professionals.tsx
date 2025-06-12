import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import img01 from "../../../../public/home-grid/01.jpg";
import img02 from "../../../../public/home-grid/02.jpg";
import img03 from "../../../../public/home-grid/03.jpg";
import img04 from "../../../../public/home-grid/04.jpg";
import img05 from "../../../../public/home-grid/05.jpg";
import img06 from "../../../../public/home-grid/06.jpg";
import img07 from "../../../../public/home-grid/07.jpg";
import img08 from "../../../../public/home-grid/08.jpg";

const clinics = [
  {
    image: img01,
    name: "Clínica Vida Nova",
    address: "Av. Paulista, São Paulo - SP",
  },
  {
    image: img02,
    name: "Clínica Horizonte",
    address: "Centro, Florianópolis - SC",
  },
  {
    image: img03,
    name: "Clínica Bem Estar",
    address: "Savassi, Belo Horizonte - MG",
  },
  {
    image: img04,
    name: "Clínica Ser Saúde",
    address: "Boa Viagem, Recife - PE",
  },
  {
    image: img05,
    name: "Clínica Equilíbrio",
    address: "Jardins, São Paulo - SP",
  },
  {
    image: img06,
    name: "Clínica Nova Esperança",
    address: "Água Verde, Curitiba - PR",
  },
  {
    image: img07,
    name: "Clínica Plenitude",
    address: "Centro, Porto Alegre - RS",
  },
  {
    image: img08,
    name: "Clínica Vitalis",
    address: "Asa Sul, Brasília - DF",
  },
];

export default function Professionals() {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas Disponíveis
        </h2>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {clinics.map((clinic, index) => (
            <Card
              className="p-0 hover:bg-cyan-100 ease-in-out duration-500"
              key={index}
            >
              <CardContent className="p-0">
                <div>
                  <div className="relative h-56 rounded-t-lg overflow-hidden">
                    <Image
                      src={clinic.image}
                      alt={`Foto da ${clinic.name}`}
                      fill
                      className="object-cover hover:scale-110 ease-in-out duration-500"
                    />
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p className="text-sm text-neutral-700">
                        {clinic.address}
                      </p>
                    </div>

                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  </div>

                  <Button asChild className="flex items-center">
                    <Link href="#">
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
