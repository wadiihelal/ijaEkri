import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react-v1';

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51IEWI2FJPhcaH6AkWRHMMsUwPVLdR9OVEKmk2OXdBEMOBEO8FVqplXuUEbicMNHHTqBRuSrBm9f3R9nbCc1rIULZ00OnEJ9Rot');

    return (
        <section className="checkout-wrapper">
            <AmplifyAuthenticator>
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
                <AmplifySignOut></AmplifySignOut>
            </AmplifyAuthenticator>
        </section>
    )
}

export default Checkout
