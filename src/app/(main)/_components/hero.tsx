import Image from "next/image"

import doctorImg from "../../../../public/hero.png"

export function Hero() {
  return (
    <section className="bg-neutral-100">
      <div className="container mx-auto px-4 pt-30 pb-8 sm:px-6 lg:px-8 lg:pb-0">
        <main className="flex items-center justify-center">
          <article className="flex max-w-4xl flex-[2] flex-col justify-center space-y-8">
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight md:text-4xl md:leading-12 lg:text-5xl">
              Encontre os melhores <br />
              <span className="text-cyan-600">profissionais</span>
              <br className="sm:hidden lg:block" /> em um único local!
            </h1>
            <p className="max-w-xl text-sm text-gray-700 md:text-lg">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>
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
  )
}
