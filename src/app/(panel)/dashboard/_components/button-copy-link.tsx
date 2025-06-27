"use client"

import { LinkIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function ButtonCopyLink({ userId }: { userId: string }) {
  async function handleCopyLink() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/clinica/${userId}`,
    )

    toast("Link de agendamento copiado com sucesso")
  }

  return (
    <Button onClick={handleCopyLink} title="Copiar pagina de agendamento">
      <LinkIcon />
    </Button>
  )
}
