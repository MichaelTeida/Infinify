/* eslint-disable camelcase */
import { createSale } from "@/lib/actions/sale.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const sale = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      tokens: Number(metadata?.tokens) || 0,
      buyerId: metadata?.buyerId || "",
      createdAt: new Date(),
    };

    const newSale = await createSale(sale);

    return NextResponse.json({ message: "OK", transaction: newSale });
  }

  return new Response("", { status: 200 });
}
