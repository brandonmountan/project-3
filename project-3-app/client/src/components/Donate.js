import React, { useState } from 'react';
import './donateComponent.css'; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { DONATE } from "../utils/mutations";

const stripePromise = await loadStripe(process.env.REACT_APP_CLIENT_STRIPE_KEY);

function DonateComponent() {
  const [showForm, setShowForm] = useState(false);

  const handleTabClick = () => {
    setShowForm(!showForm);
  };

  const [donate] = useMutation(DONATE);
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonate = async () => {
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
    <div className="header">
      {/* Tab at the top right */}
      <div className={`tab ${showForm ? 'open' : ''}`} onClick={handleTabClick}></div>

      {/* Donation form */}
      <div className={`donation-form ${showForm ? 'open' : ''}`}>
        <h2>Donate</h2>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
            min="1"
            step="1"
          />
          <Button onClick={handleDonate} variant="light">
            Submit
          </Button>
        </InputGroup>
        {/* <button className="close-button" onClick={handleTabClick}>
          Close
        </button> */}
      </div>
    </div>
  );
}

export default DonateComponent;

