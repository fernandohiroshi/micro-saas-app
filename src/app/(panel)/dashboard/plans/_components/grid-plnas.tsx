import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";

export function GridPlans() {
  return (
    <div>
      {subscriptionPlans.map((plan, index) => (
        <Card key={plan.id} className="flex flex-col w-full mx-auto">
          {index === 1 && (
            <div className="bg-cyan-500 w-full py-3 text-center rounded-t-xl">
              <p className="uppercase text-white font-semibold">
                Promoção exclusiva
              </p>
            </div>
          )}

          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
