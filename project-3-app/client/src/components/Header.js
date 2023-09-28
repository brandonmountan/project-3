import React from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { DONATE } from "../utils/mutations";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Header() {
  const [donate, { data }] = useMutation(DONATE);

  const handleDonate = async (amount) => {
    try {
      const { data } = await donate({ variables: { amount } });
      const stripe = await stripePromise;
      const { session } = data.donate;
      const result = await stripe.redirectToCheckout({ sessionId: session });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div class="p-4">
      <h1 class="text-center">
        PostGame <Badge bg="secondary">Welcome!</Badge>
      </h1>
      <button onClick={() => handleDonate(2)}>Donate</button>
    </div>
  );
}

export default Header;
