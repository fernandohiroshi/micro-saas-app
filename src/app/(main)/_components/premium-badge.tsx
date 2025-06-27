import { Star } from "lucide-react"

export function PremiumCardBadge() {
  return (
    <div title="Plano PRO">
      <Star
        size={32}
        className="absolute top-2 right-2 z-[2] animate-pulse rounded-full bg-yellow-500 p-1 text-white"
      />
    </div>
  )
}
