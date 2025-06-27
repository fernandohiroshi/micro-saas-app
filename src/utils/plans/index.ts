export type PlanDetailsProps = {
  maxServices: number
}

export type PlansProps = {
  BASIC: PlanDetailsProps
  PROFESSIONAL: PlanDetailsProps
}

export const PLANS = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
}

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Basic",
    description: "Perfeito para clinicas menores",
    oldPrice: "R$ 90,90",
    price: "28,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      "Agendamento ilimitado",
      "Lembretes",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description: "Ideal para clinicas grandes",
    oldPrice: "R$ 159,90",
    price: "99,90",
    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
      "Agendamento ilimitado",
      "Lembretes & suporte online",
    ],
  },
]
