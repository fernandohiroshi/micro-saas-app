"use client";

// React & Next
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Utils
import clsx from "clsx";

// Icons
import {
  Banknote,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  User,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

// Assets
import Logo from "../../../../../public/logo.png";

// Sidebar Component
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        {/* Logo */}
        <div className="mt-4 mb-6">
          {!isCollapsed ? (
            <h2 className="text-4xl font-bold">
              Plan<span className="text-cyan-600">C</span>
            </h2>
          ) : (
            <Image
              src={Logo}
              alt="Logo"
              priority
              quality={100}
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </div>

        {/* Collapse Toggle */}
        <Button
          className="self-end bg-neutral-200 hover:bg-neutral-300 mb-2"
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>

        {/* Collapsed Navigation */}
        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
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

        {/* Expanded Navigation (Collapsible) */}
        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-2 overflow-hidden">
              <span className="text-sm text-neutral-400 font-medium uppercase mt-1">
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
              <span className="text-sm text-neutral-400 font-medium uppercase mt-1">
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
      </aside>

      {/* Main Content (Desktop & Mobile) */}
      <div
        className={clsx(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          {
            "md:ml-20": isCollapsed,
            "md:ml-64": !isCollapsed,
          }
        )}
      >
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between border-b px-4 h-14 z-10 sticky top-0 bg-white/60">
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

                {/* Mobile Menu Items */}
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
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

// SidebarLink Component Props
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapses: boolean;
  onClick?: () => void;
}

// SidebarLink Component
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
          "flex items-center justify-start gap-2 px-3 py-2 rounded-md font-semibold w-full",
          {
            "bg-cyan-100 hover:bg-cyan-100 text-white": pathname === href,
            "text-black": pathname === href,
          }
        )}
      >
        <span>{icon}</span>
        {!isCollapses && <span>{label}</span>}
      </Button>
    </Link>
  );
}
