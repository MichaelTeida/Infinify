"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import Sale from "@/lib/database/models/sale.model";
import { updateTokens } from "@/lib/actions/user.actions";

export async function checkoutTokens(sale: CheckoutSaleParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(sale.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: sale.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: sale.plan,
      tokens: sale.tokens,
      buyerId: sale.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });
  redirect(session.url!);
}

export async function createSale(sale: CreateSaleParams) {
  try {
    await connectToDatabase();

    const newSale = await Sale.create({
      ...sale,
      buyer: sale.buyerId,
    });
    await updateTokens(sale.buyerId, sale.tokens);
    return JSON.parse(JSON.stringify(newSale));
  } catch (error) {
    handleError(error);
  }
}
