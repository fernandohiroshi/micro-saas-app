import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

import { Toaster } from "sonner"

import { SessionAuthProvider } from "@/components/session-auth"
import { QueryClientContext } from "@/providers/queryclient"

import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlanC — Plataforma de Agendamento para Clínicas | Konbini Code",
  description:
    "PlanC é um micro SaaS desenvolvido com Next.js para que clínicas possam cadastrar seus serviços e permitir que clientes agendem online. Projeto criado por Fernando Hiroshi Takeda, da Konbini Code.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PlanC — Plataforma de Agendamento para Clínicas",
    description:
      "Agendamentos online simplificados para clínicas. Crie seu perfil, cadastre serviços e compartilhe um link com seus clientes. Projeto da Konbini Code.",
    images: ["/metadata.jpg"],
    url: "https://planc-saas.vercel.app",
    type: "website",
    locale: "pt_BR",
    siteName: "PlanC",
  },
  metadataBase: new URL("https://planc-saas.vercel.app"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster duration={4000} richColors position="top-right" />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
