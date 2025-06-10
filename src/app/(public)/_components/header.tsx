import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl text-neutral-900 font-bold">
          Dent<span className="text-cyan-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center">
          <a href="#">Profissionais</a>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-neutral-900 hover:bg-transparent"
              variant="outline"
              size="icon"
            >
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]"
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Veja nossos links</SheetDescription>
            </SheetHeader>

            <nav className="hidden md:flex items-center">
              <a href="#">Profissionais</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
