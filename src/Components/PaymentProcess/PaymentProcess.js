import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentProcessForm from './PaymentProcessForm';
import SplitProcessForm from './SplitProcessForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Ie1V5KDesBKRK3vREFJqCypXH8Z2ahuYKq2Ey6VrFBnIeVA9C7jHrm1RCUMgkCcTA4RCQhhgYb7xsDjmAO7BEZb00D6AZmfr3');

const PaymentProcess = ({handlePaymentSuccess}) => {
  return (
    <Elements stripe={stripePromise}>
        
       <PaymentProcessForm handlePaymentSuccess={handlePaymentSuccess}></PaymentProcessForm>
    </Elements>
  );
};

export default PaymentProcess;