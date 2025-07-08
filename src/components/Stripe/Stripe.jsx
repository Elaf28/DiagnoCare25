// // components/StripeCheckout.jsx
// import React from 'react';
// // import { loadStripe } from '@stripe/stripe-js';
// import { Button, Container } from 'react-bootstrap';

// // مفتاحك العام من Stripe Dashboard (Publishable key)
// // const stripePromise = loadStripe('pk_test_1234567890abcdefg'); 

// export default function StripeCheckout() {
//   const handleClick = async () => {
//     // const stripe = await stripePromise;

//     // اتصال مع الباك إند علشان يرجّع sessionId
//     const response = await fetch('https://your-backend.com/create-checkout-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // ممكن تحتاجي تضيفي Authorization لو فيه JWT
//       },
//       body: JSON.stringify({
//         amount: 2000, // السعر بـ سنت (مثلاً: 2000 = $20)
//         description: 'Medical consultation',
//         // ممكن تبعتي بيانات إضافية حسب تصميم الباك
//       }),
//     });

//     const session = await response.json();

//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (result.error) {
//       console.error(result.error.message);
//       alert("Something went wrong during checkout.");
//     }
//   };

//   return (
//     <Container className="text-center mt-5">
//       <h2>Pay for Consultation</h2>
//       <Button variant="primary" onClick={handleClick}>
//         Pay with Stripe
//       </Button>
//     </Container>
//   );
// }


import React from 'react'

export default function Stripe() {
  return (
    <div>Stripe</div>
  )
}
