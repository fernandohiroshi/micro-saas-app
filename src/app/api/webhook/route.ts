import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  console.log("WEBHOOK INICIANDO...");

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case "customer.subscription.deleted":
      const payment = event.data.object as Stripe.Subscription;

      console.log("Assinatura cancelada: ", payment);
      break;

    case "customer.subscription.updated":
      const paymentIntent = event.data.object as Stripe.Subscription;

      console.log("Atualizar assinatura: : ", paymentIntent);
      break;

    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      console.log("Assinatura realizada: ", checkoutSession);
      break;

    default:
      console.log("Evento não tratado: ", event.type);
  }

  return NextResponse.json({ received: true });
};
