"use client";

import Image from "next/image";
import imageTest from "../../../../../../public/user.png";
import { MapPin } from "lucide-react";

export default function ScheduleContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-cyan-600" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative h-48 w-48 rounded-full overflow-hidden shadow bg-white mb-8">
              <Image
                src={imageTest}
                alt="Foto da clínica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl mb-2">Clínica teste</h1>
            <div className="flex gap-1 items-center">
              <MapPin />
              <span>Endereco nao informado</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
