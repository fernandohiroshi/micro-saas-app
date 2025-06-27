"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function QueryClientContext({
  children,
}: {
  children: React.ReactNode
}) {
  const queruClient = new QueryClient()

  return (
    <QueryClientProvider client={queruClient}>{children}</QueryClientProvider>
  )
}
