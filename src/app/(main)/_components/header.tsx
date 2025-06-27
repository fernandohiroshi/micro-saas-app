"use client"

import { useState } from "react"
import {
  BiLogoFacebookCircle,
  BiLogoGmail,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi"
import { PuffLoader } from "react-spinners"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { LogIn, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { handleRegister } from "../_actions/login"

export function Header() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Instagram", icon: BiLogoInstagram },
    { href: "/", label: "Twitter", icon: BiLogoTwitter },
    { href: "/", label: "Gmail", icon: BiLogoGmail },
    { href: "/", label: "Facebook", icon: BiLogoFacebookCircle },
  ]

  async function handleLogin() {
    await handleRegister("google")
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
            className="flex items-center font-semibold duration-200 ease-in-out hover:text-cyan-500"
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
  )

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] bg-white/80 px-4 py-6 shadow backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          Plan<span className="text-cyan-600">C</span>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden items-center gap-2 md:flex">
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
            className="z-[9999] w-[240px] bg-white/80 backdrop-blur-sm sm:w-[300px]"
          >
            <SheetHeader>
              <SheetTitle className="mb-8">Menu</SheetTitle>
              <NavLinks />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
