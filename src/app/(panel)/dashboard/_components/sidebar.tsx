"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import clsx from "clsx"

import {
  Banknote,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  LogOut,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Logo from "../../../../../public/logo.png"

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { update } = useSession()

  async function handleLogout() {
    await signOut()
    await update()
    router.replace("/")
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "bg-background flex h-full flex-col justify-between border-r p-4 transition-all duration-300",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:fixed md:flex": true,
          },
        )}
      >
        <div>
          <div className="mt-4 mb-6">
            {!isCollapsed ? (
              <Link href="/" title="Home">
                <h2 className="text-4xl font-bold">
                  Plan<span className="text-cyan-600">C</span>
                </h2>
              </Link>
            ) : (
              <Link href="/" title="Home">
                <Image
                  src={Logo}
                  alt="Logo"
                  priority
                  quality={100}
                  style={{ width: "auto", height: "auto" }}
                />
              </Link>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              className="mb-2 bg-neutral-200 hover:bg-neutral-300"
              variant="outline"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          {isCollapsed && (
            <nav className="mt-2 flex flex-col gap-1 overflow-hidden">
              <SidebarLink
                href="/dashboard"
                label="Agendamento"
                pathname={pathname}
                isCollapses={isCollapsed}
                icon={<CalendarCheck />}
              />
              <SidebarLink
                href="/dashboard/services"
                label="Serviços"
                pathname={pathname}
                isCollapses={isCollapsed}
                icon={<Folder />}
              />
              <SidebarLink
                href="/dashboard/profile"
                label="Meu perfil"
                pathname={pathname}
                isCollapses={isCollapsed}
                icon={<User />}
              />
              <SidebarLink
                href="/dashboard/plans"
                label="Planos"
                pathname={pathname}
                isCollapses={isCollapsed}
                icon={<Banknote />}
              />
            </nav>
          )}

          <Collapsible open={!isCollapsed}>
            <CollapsibleContent>
              <nav className="flex flex-col gap-2 overflow-hidden">
                <span className="mt-1 text-sm font-medium text-neutral-400 uppercase">
                  Painel
                </span>
                <SidebarLink
                  href="/dashboard"
                  label="Agendamento"
                  pathname={pathname}
                  isCollapses={isCollapsed}
                  icon={<CalendarCheck />}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapses={isCollapsed}
                  icon={<Folder />}
                />
                <span className="mt-1 text-sm font-medium text-neutral-400 uppercase">
                  Configurações
                </span>
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu perfil"
                  pathname={pathname}
                  isCollapses={isCollapsed}
                  icon={<User />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapses={isCollapsed}
                  icon={<Banknote />}
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <Button
          onClick={handleLogout}
          title="Sair da conta"
          className="w-full"
          size="sm"
        >
          {isCollapsed ? <LogOut /> : "Sair da conta"}
        </Button>
      </aside>

      <div
        className={clsx(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          {
            "md:ml-20": isCollapsed,
            "md:ml-64": !isCollapsed,
          },
        )}
      >
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white/60 px-4 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center gap-2">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List />
                </Button>
              </SheetTrigger>

              <Link href="/" title="Home">
                <h1 className="text-base font-semibold md:text-lg">
                  Plan<span className="text-cyan-600">C</span>
                </h1>
              </Link>
            </div>

            <SheetContent side="right" className="text-black sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  Plan<span className="text-cyan-600">C</span>
                </SheetTitle>

                <SheetDescription className="mb-6">
                  Menu Administrativo
                </SheetDescription>

                <nav className="grid gap-2 text-base">
                  <SidebarLink
                    href="/dashboard"
                    label="Agendamento"
                    pathname={pathname}
                    isCollapses={isCollapsed}
                    icon={<CalendarCheck />}
                    onClick={() => setIsOpen(false)}
                  />
                  <SidebarLink
                    href="/dashboard/services"
                    label="Serviços"
                    pathname={pathname}
                    isCollapses={isCollapsed}
                    icon={<Folder />}
                    onClick={() => setIsOpen(false)}
                  />
                  <SidebarLink
                    href="/dashboard/profile"
                    label="Meu perfil"
                    pathname={pathname}
                    isCollapses={isCollapsed}
                    icon={<User />}
                    onClick={() => setIsOpen(false)}
                  />
                  <SidebarLink
                    href="/dashboard/plans"
                    label="Planos"
                    pathname={pathname}
                    isCollapses={isCollapsed}
                    icon={<Banknote />}
                    onClick={() => setIsOpen(false)}
                  />
                </nav>
              </SheetHeader>

              <SheetFooter>
                <Button size="sm" onClick={handleLogout}>
                  Sair da conta
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 px-2 py-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapses: boolean
  onClick?: () => void
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapses,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        onClick={onClick}
        className={clsx(
          "flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 font-semibold",
          {
            "bg-cyan-100 text-white hover:bg-cyan-100": pathname === href,
            "text-black": pathname === href,
          },
        )}
      >
        <span>{icon}</span>
        {!isCollapses && <span>{label}</span>}
      </Button>
    </Link>
  )
}
