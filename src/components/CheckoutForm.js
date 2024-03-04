import React, { useState } from 'react';

const CheckoutForm = ({ orderId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const submitPayment = async () => {
        setIsLoading(true);
        try {
            // Assuming you have an endpoint `/create-phonepe-payment` that initiates the payment process
            const response = await fetch('/api/create-phonepe-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });
            const data = await response.json();

            if (data.url) {
                // Redirect user to PhonePe payment page
                window.location.href = data.url;
            } else {
                // Handle any errors returned by your server
                setMessage('Failed to initiate payment');
            }
        } catch (error) {
            setMessage('An unexpected error occurred');
            console.error('Payment initiation error:', error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <button
                onClick={submitPayment}
                disabled={isLoading}
                className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'
            >
                {isLoading ? 'Processing...' : 'Pay with PhonePe'}
            </button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default CheckoutForm;





// import React, { useState } from 'react';

// const CheckoutForm = ({ orderId }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState(null);

//     const initiatePayment = async () => {
//         setIsLoading(true);
//         try {
//             // Assuming you have an endpoint to initiate a payment and get a redirect URL or payment details
//             const response = await fetch('/api/payment/initiate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ orderId }),
//             });
//             const data = await response.json();

//             // Handle redirection or SDK integration here based on the response
//             // For example, if PhonePe requires redirecting to their portal
//             if (data.redirectUrl) {
//                 window.location.href = data.redirectUrl;
//             }

//             // If PhonePe provides an SDK method, you would call it here instead

//         } catch (error) {
//             console.error('Payment initiation failed:', error);
//             setMessage('Failed to initiate payment');
//         }
//         setIsLoading(false);
//     };

//     return (
//         <div>
//             <button
//                 onClick={initiatePayment}
//                 disabled={isLoading}
//                 className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
//             >
//                 {isLoading ? 'Loading...' : 'Pay with PhonePe'}
//             </button>
//             {message && <div>{message}</div>}
//         </div>
//     );
// };

// export default CheckoutForm;



// import React from 'react'
// import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'
// import { useState } from 'react'


// const CheckoutForm = ({ orderId }) => {

//     localStorage.setItem('orderId', orderId)
//     const stripe = useStripe()
//     const elements = useElements()
//     const [message, setMessage] = useState(null)
//     const [isLoading, setIsLoading] = useState(false)

//     const paymentElementOptions = {
//         loyout: 'tabs'
//     }

//     const submit = async (e) => {
//         e.preventDefault()

//         if (!stripe || !elements) {
//             return
//         }
//         setIsLoading(true)
//         const { error } = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: 'http://localhost:3000/order/confirm'
//             }
//         })
//         if (error.type === 'card_error' || error.type === 'validation_error') {
//             setMessage(error.message)
//         } else {
//             setMessage('An unexpected error occurred')
//         }
//         setIsLoading(false)
//     }

//     return (
//         <form onSubmit={submit} id='payment-form' >
//             <LinkAuthenticationElement
//                 id='link-authentication-element'
//             />
//             <PaymentElement id='payment-element' options={paymentElementOptions} />
//             <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
//                 <span id='button-text'>
//                     {
//                         isLoading ? <div>Loading.....</div> : "Pay now"
//                     }
//                 </span>
//             </button>
//             {message && <div>{message}</div>}
//         </form>
//     )
// }

// export default CheckoutForm