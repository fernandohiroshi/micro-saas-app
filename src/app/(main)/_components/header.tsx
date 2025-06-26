"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BiLogoInstagram,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoGmail,
} from "react-icons/bi";
import { handleRegister } from "../_actions/login";
import { PuffLoader } from "react-spinners";
import { LogIn, Menu } from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Instagram", icon: BiLogoInstagram },
    { href: "/", label: "Twitter", icon: BiLogoTwitter },
    { href: "/", label: "Gmail", icon: BiLogoGmail },
    { href: "/", label: "Facebook", icon: BiLogoFacebookCircle },
  ];

  async function handleLogin() {
    await handleRegister("google");
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.label}
          asChild
          variant="outline"
          className="flex items-center justify-start text-sm md:text-base"
        >
          <Link
            href={item.href}
            className="flex items-center hover:text-cyan-500 duration-200 ease-in-out font-semibold"
          >
            <item.icon />
            <span className="md:hidden">{item.label}</span>
          </Link>
        </Button>
      ))}

      {status === "loading" ? (
        <PuffLoader size={30} color="darkcyan" />
      ) : session ? (
        <Button variant="outline" asChild className="font-semibold">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button className="mt-4 md:mt-0" onClick={handleLogin}>
          <LogIn />
          Login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-6 px-4 bg-white/80 backdrop-blur-sm shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          Plan<span className="text-cyan-600">C</span>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-2">
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
            className="w-[240px] sm:w-[300px] z-[9999] bg-white/80 backdrop-blur-sm"
          >
            <SheetHeader>
              <SheetTitle className="mb-8">Menu</SheetTitle>
              <NavLinks />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
