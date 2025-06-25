import Link from "next/link";
import { Button } from "./button";

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="bg-red-500 text-white text-xs sm:text-sm mdlg:text-base px-3 py-2 my-4 flex items-center justify-between gap-4 rounded-md">
      <div>
        {expired ? (
          <h3 className="font-semibold">
            Plano expirado ou você não possui um plano ativo!
          </h3>
        ) : (
          <h3>Você excedeu o limite de seu plano</h3>
        )}
        <p className="hidden xl:block text-sm text-neutral-100">
          Acesse o seu plano para verificar os detalhes
        </p>
      </div>

      <Button asChild size="sm">
        <Link href="/dashboard/plans">Acessar planos</Link>
      </Button>
    </div>
  );
}
