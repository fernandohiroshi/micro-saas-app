"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Handshake, LogIn, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const session = null;

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
          variant="ghost"
          className="flex items-center justify-start text-sm md:text-base"
        >
          <Link
            href={item.href}
            className="flex items-center hover:text-cyan-500 duration-200 ease-in-out"
          >
            <item.icon />
            {item.label}
          </Link>
        </Button>
      ))}

      {session ? (
        <Link href="/dashboard">Acessar clinica</Link>
      ) : (
        <Button className="mt-4">
          <LogIn />
          Login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-6 px-4 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          Plan<span className="text-cyan-600">C</span>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        {/* MOBILE */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="hover:bg-transparent" variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]"
          >
            <SheetHeader>
              <SheetTitle className="mb-8">Menu</SheetTitle>
              <SheetClose />
              <NavLinks />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
