import { Star } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { subscriptionPlans } from "@/utils/plans/index"

import { SubscriptionButton } from "./subscription-button"

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id} className="mx-auto flex w-full flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl uppercase md:text-2xl">
              {plan.id === "PROFESSIONAL" && (
                <Star className="animate-pulse rounded-full bg-yellow-500 p-1 text-white" />
              )}{" "}
              {plan.name}
            </CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="list-inside list-disc">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm md:text-base">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-gray-600 line-through">{plan.oldPrice}</p>
              <p className="text-2xl font-bold text-black">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubscriptionButton
              type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"}
            />
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
