import Link from "next/link"

import { Button } from "./button"

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="mdlg:text-base my-4 flex items-center justify-between gap-4 rounded-md bg-red-500 px-3 py-2 text-xs text-white sm:text-sm">
      <div>
        {expired ? (
          <h3 className="font-semibold">
            Plano expirado ou você não possui um plano ativo!
          </h3>
        ) : (
          <h3>Você excedeu o limite de seu plano</h3>
        )}
        <p className="hidden text-sm text-neutral-100 xl:block">
          Acesse o seu plano para verificar os detalhes
        </p>
      </div>

      <Button asChild size="sm">
        <Link href="/dashboard/plans">Acessar planos</Link>
      </Button>
    </div>
  )
}
