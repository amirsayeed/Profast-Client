import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            setError(error.message);
        }else{
            setError('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4 p-4 border rounded-xl shadow bg-white'>
                <CardElement className='p-2 border rounded'/>
                    <button type='submit'
                    className="btn btn-primary w-full text-black"
                    disabled={!stripe}>
                        Pay for Parcel Pickup
                    </button>
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
            </form>
        </div>
    );
};

export default PaymentForm;