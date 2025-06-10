"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Handshake, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#profissionais", label: "Profissionais", icon: Handshake },
    { href: "/contato", label: "Contatos", icon: Mail },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-neutral-900 shadow-none"
        >
          <Link href={item.href} className="flex items-center">
            <item.icon className="text-cyan-500" /> {item.label}
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl text-neutral-900 font-bold">
          Dent<span className="text-cyan-500">PRO</span>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        {/* MOBILE */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            </SheetHeader>

            <nav className="flex flex-col items-start md:hidden">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
