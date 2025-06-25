import type { Metadata } from "next";
import { SessionAuthProvider } from "@/components/session-auth";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { QueryClientContext } from "@/providers/queryclient";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanC",
  description: "Desenvolvido por Fernando Hiroshi - Konbini Code.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
