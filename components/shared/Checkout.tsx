// components/shared/Checkout.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { checkoutTokens } from "@/lib/actions/sale.actions";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const Checkout = ({
  plan,
  amount,
  tokens,
  buyerId,
}: {
  plan: string;
  amount: number;
  tokens: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, [toast]); // Add toast to the dependency array

  const onCheckout = async () => {
    const sale = {
      plan,
      amount,
      tokens,
      buyerId,
    };

    try {
      await checkoutTokens(sale);
    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        description: error.message || "Failed to initiate checkout.",
        variant: "destructive",
      });
    }
  };

  return (
    <form action={onCheckout}>
      {" "}
      {/* Removed method="POST" */}
      <section>
        <Button type="submit" role="link" className="submit-button-mobile">
          Buy tokens
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
