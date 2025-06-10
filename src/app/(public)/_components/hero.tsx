import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/hero.png";

export function Hero() {
  return (
    <section className="bg-neutral-100">
      <div className="container mx-auto px-4 pt-30 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="flex-[2] max-w-4xl space-y-8 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold leading-12 max-w-2xl tracking-tight">
              Encontre os melhores <br />
              <span className="text-cyan-600">profissionais</span> <br /> em um
              único local!
            </h1>
            <p className="max-w-xl text-base md:text-lg text-gray-600 ">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>

            <Button className="bg-cyan-600 hover:bg-cyan-500 w-fit md:px-5 font-semibold">
              Encontre uma clinica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={doctorImg}
              alt="Foto ilustrativa de um profissional de saude"
              width={400}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
