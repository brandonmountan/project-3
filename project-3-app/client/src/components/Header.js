import React from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

async function donation() {
  const stripe = await stripePromise;
}

function Header() {
  return (
    <div class="p-4">
      <h1 class="text-center">
        PostGame <Badge bg="secondary">Welcome!</Badge>
      </h1>
      <button onClick={donation}>Donate</button>
    </div>
  );
}

export default Header;
