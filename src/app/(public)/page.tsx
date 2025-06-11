import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import Professionals from "./_components/professionals";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div>
        <Hero />

        <Professionals />
      </div>
    </div>
  );
}
