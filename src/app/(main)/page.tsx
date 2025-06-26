import { BiLogoWhatsapp } from "react-icons/bi";
import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import Professionals from "./_components/professionals";
import { getProfessionals } from "./_data-access/get-professionals";

export const revalidate = 120;

export default async function Home() {
  const professionals = await getProfessionals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <Hero />
        <Professionals professionals={professionals || []} />
        <Footer />
      </main>
      <BiLogoWhatsapp className="fixed cursor-pointer hover:scale-95 ease-in-out duration-300 bottom-3 right-3 z-[2] text-emerald-500 size-12 md:size-16  hover:bg-emerald-100/90 bg-emerald-50/90 rounded-full p-1.5 shadow-xl hover:shadow-2xl border" />
    </div>
  );
}
