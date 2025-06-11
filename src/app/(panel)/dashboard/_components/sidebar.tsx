"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Banknote, CalendarCheck, Folder, List, User } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={clsx(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          {
            "md:ml-20": isCollapsed,
            "md:ml-64": !isCollapsed,
          }
        )}
      >
        <header className="md:hidden flex items-center justify-between border-b px-4 h-14 z-10 sticky top-0 bg-white/60">
          <Sheet>
            <div className="flex items-center gap-2">
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <List />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Plan<span className="text-cyan-600">C</span>
              </h1>
            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black">
              <SheetHeader>
                <SheetTitle>
                  Plan<span className="text-cyan-600">C</span>
                </SheetTitle>
                <SheetClose />
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
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapses: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapses,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md font-semibold",
          {
            "bg-cyan-500 text-white": pathname === href,
            "text-black": pathname === href,
          }
        )}
      >
        <span>{icon}</span>
        {!isCollapses && <span>{label}</span>}
      </div>
    </Link>
  );
}
