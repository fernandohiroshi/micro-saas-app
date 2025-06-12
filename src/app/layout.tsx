import type { Metadata } from "next";
import { SessionAuthProvider } from "@/components/session-auth";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlanC",
  description: "Desenvolvido por Fernando Hiroshi - Konbini Code.",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  );
}
