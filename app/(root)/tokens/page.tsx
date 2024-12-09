import React from "react";
import { SignedIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans, faqsPlan } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";

const Tokens = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Token kits (TEST MODE)"
        description="Choose the perfect kit to fuel your creativity"
      />

      <section className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
                pricing-card 
                ${plan.name === "Pro kit" ? "pricing-card-popular" : ""}
              `}
          >
            <div className="text-center">
              {plan.icon && <plan.icon.main className={`pricing-icon`} />}
              <h3 className="pricing-card-title">{plan.name}</h3>
              <p className="pricing-card-price">
                <span className="text-2xl mr-1">$</span>
                {plan.price}
              </p>
              <p className="pricing-card-tokens">{plan.tokens} tokens</p>
            </div>

            {/* Inclusions */}
            <ul className="pricing-card-inclusions_list">
              {plan.inclusions.map((inclusion) => (
                <li
                  key={plan.name + inclusion.label}
                  className="pricing-card-inclusions_list-item"
                >
                  {inclusion.isIncluded ? (
                    <plan.icon.iconIncluded className="text-green-500" />
                  ) : (
                    <plan.icon.iconNotIncluded className="text-red-500" />
                  )}
                  <span className="text-md">{inclusion.label}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <div className="text-center">
              {plan.name === "Free" ? (
                <Button className="submit-button-mobile" disabled>
                  Already assigned
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    tokens={plan.tokens}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="pricing-faq">
        <h2 className="pricing-faq-title">Frequently Asked Questions</h2>
        <div className="pricing-faq-grid">
          {faqsPlan.map((faq, index) => (
            <div key={index} className="pricing-faq-grid_element">
              <div className="flex items-center mb-4">
                <faq.icon />
                <h3 className="ml-3 font-semibold text-lg text-gray-800">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-600 text-left">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Tokens;
