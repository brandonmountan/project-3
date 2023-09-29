import React from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { DONATE } from "../utils/mutations";
import { useState } from "react";

const stripePromise = await loadStripe(process.env.REACT_APP_CLIENT_STRIPE_KEY);

function Header() {
  const [donate] = useMutation(DONATE);
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonate = async (amount) => {
    try {
      const { data } = await donate({ variables: { amount: donationAmount } });
      const stripe = await stripePromise;
      const { session } = data.donate;
      const result = await stripe.redirectToCheckout({ sessionId: session });
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-center">
        PostGame <Badge bg="secondary">Welcome!</Badge>
      </h1>
      <h2>Donate</h2>
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
        min="1"
        step="1"
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
}

export default Header;
