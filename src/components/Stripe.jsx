import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import axios from 'axios'
import { useState } from 'react'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51Nk8Y4F0B89ncn3xWB6ZN3GsbVIVL7Jqfa3jxtIOpPkKHcleHZw4EMPJKd4cRwm34ZARBeYmAWwu3VxyYL1gb6OT00UKNSvfvb')
const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { price }, { withCredentials: true })
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Start Payment</button>
            }
        </div>
    )
}

export default Stripe



// import React, { useState } from 'react';
// import axios from 'axios';

// const PhonePePayment = ({ price, orderId }) => {
//     const [message, setMessage] = useState('');

//     const initiatePayment = async () => {
//         try {
//             // Ensure this URL matches your server's endpoint
//             const response = await axios.post('http://localhost:5000/api/order/create-payment', {
//                 transactionId: orderId,
//                 MUID: "DOOLKYONLINE", // Ensure this is correctly replaced
//                 name: "Customer_Name", // Dynamically replace as needed
//                 amount: price,
//                 number: "740885445" // Dynamically replace as needed
//             }, {
//                 withCredentials: true
//             });

//             const data = response.data;
//             if (data.redirectUrl) {
//                 window.location.href = data.redirectUrl;
//             } else {
//                 setMessage('Failed to initiate payment');
//             }
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             setMessage('Error initiating payment');
//         }
//     };

//     return (
//         <div className='mt-4'>
//             {message && <p>{message}</p>}
//             <button onClick={initiatePayment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
//                 Pay with PhonePe
//             </button>
//         </div>
//     );
// };

// export default PhonePePayment;



// import React, { useState } from 'react';
// import axios from 'axios';

// const PhonePePayment = ({ price, orderId }) => {
//     const [message, setMessage] = useState('');
//     const [clientSecret, setClientSecret] = useState('')

//     const initiatePayment = async () => {
//         try {
//             const { data } = await axios.post('http://localhost:5000/api/order/create-payment', {
//                 transactionId: orderId, // Ensure this ID is unique
//                 MUID: "Your_Merchant_User_ID", // Replace with actual ID
//                 name: "Your_Customer_Name", // Dynamically set this
//                 amount: price,
//                 number: "Customer_Phone_Number" // Dynamically set this
//             },{ price }, { withCredentials: true });
//             setClientSecret(data.clientSecret)
//             if (data.redirectUrl) {
//                 // Redirect user to PhonePe for payment
//                 window.location.href = data.redirectUrl;
//             } else {
//                 setMessage('Failed to initiate payment');
//             }
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             setMessage('Error initiating payment');
//         }
//     };

//     return (
//         <div className='mt-4'>
//             {message && <p>{message}</p>}
//             <button onClick={initiatePayment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
//                 Pay with PhonePe
//             </button>
//         </div>
//     );
// };

// export default PhonePePayment;


// import React, { useState } from 'react';
// import axios from 'axios';

// const PhonePePayment = ({ price, orderId }) => {
//     const [message, setMessage] = useState('');

//     const initiatePayment = async () => {
//         try {
//             const { data } = await axios.post('/api/payment/phonepe/create', { price });
//             if (data.redirectUrl) {
//                 // Redirect user to PhonePe for payment
//                 window.location.href = data.redirectUrl;
//             } else {
//                 setMessage('Failed to initiate payment');
//             }
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             setMessage('Error initiating payment');
//         }
//     };

//     return (
//         <div className='mt-4'>
//             {message && <p>{message}</p>}
//             <button onClick={initiatePayment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>
//                 Pay with PhonePe
//             </button>
//         </div>
//     );
// };

// export default PhonePePayment;




// import React from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'

// import axios from 'axios'
// import { useState } from 'react'
// import CheckoutForm from './CheckoutForm'

// const stripePromise = loadStripe('pk_test_51Nk8Y4F0B89ncn3xWB6ZN3GsbVIVL7Jqfa3jxtIOpPkKHcleHZw4EMPJKd4cRwm34ZARBeYmAWwu3VxyYL1gb6OT00UKNSvfvb')

// const Stripe = ({ price, orderId }) => {
//     const [clientSecret, setClientSecret] = useState('')
//     const apperance = {
//         theme: 'stripe'
//     }
//     const options = {
//         apperance,
//         clientSecret
//     }
//     const create_payment = async () => {
//         try {
//             const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { price }, { withCredentials: true })
//             setClientSecret(data.clientSecret)
//         } catch (error) {
//             console.log(error.response.data)
//         }
//     }
//     return (
//         <div className='mt-4'>
//             {
//                 clientSecret ? (
//                     <Elements options={options} stripe={stripePromise}>
//                         <CheckoutForm orderId={orderId} />
//                     </Elements>
//                 ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white'>Start Payment</button>
//             }
//         </div>
//     )
// }

// export default Stripe