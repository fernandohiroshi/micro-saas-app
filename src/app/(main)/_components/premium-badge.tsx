import { Star } from "lucide-react";

export function PremiumCardBadge() {
  return (
    <div title="Plano PRO">
      <Star
        size={32}
        className="absolute right-2 top-2 text-white rounded-full p-1 bg-yellow-500 animate-pulse z-[2]"
      />
    </div>
  );
}
