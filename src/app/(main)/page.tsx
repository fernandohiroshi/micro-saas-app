import { BiLogoWhatsapp } from "react-icons/bi"

import Footer from "./_components/footer"
import { Header } from "./_components/header"
import { Hero } from "./_components/hero"
import Professionals from "./_components/professionals"
import { getProfessionals } from "./_data-access/get-professionals"

export const revalidate = 120

export default async function Home() {
  const professionals = await getProfessionals()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        <Hero />
        <Professionals professionals={professionals || []} />
        <Footer />
      </main>
      <BiLogoWhatsapp className="fixed right-3 bottom-3 z-[2] size-12 cursor-pointer rounded-full border bg-emerald-50/90 p-1.5 text-emerald-500 shadow-xl duration-300 ease-in-out hover:scale-95 hover:bg-emerald-100/90 hover:shadow-2xl md:size-16" />
    </div>
  )
}
